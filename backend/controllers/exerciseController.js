const Exercise = require("../models/ExerciseModel");
const path = require("path");
const fs = require("fs");

// Get exercises by category
const getExercisesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const exercises = await Exercise.find({ category });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all exercises
const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({});
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new exercise (supports both image URL & file upload)
const addExercise = async (req, res) => {
  const { name, category, level } = req.body;
  const img = req.file ? `/images/exercise/${req.file.filename}` : req.body.imgUrl || ""; // Use uploaded file or URL

  try {
    const newExercise = new Exercise({ name, category, level, img });
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an exercise (supports both image URL & file upload)
const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, category, level } = req.body;
  let imgPath = "";

  try {
    const existingExercise = await Exercise.findById(id);
    if (!existingExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    if (req.file) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, "../images/exercise", path.basename(existingExercise.img));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      imgPath = `/images/exercise/${req.file.filename}`;
    } else {
      imgPath = req.body.imgUrl || existingExercise.img; // Keep old image if not updated
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(
      id,
      { name, category, level, img: imgPath },
      { new: true }
    );

    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an exercise
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(id);
    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Delete the image file if it exists
    if (deletedExercise.img && !deletedExercise.img.startsWith("http")) {
      const imagePath = path.join(__dirname, "../images/exercise", path.basename(deletedExercise.img));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Export all controller functions
module.exports = {
  getExercisesByCategory,
  getAllExercises,
  addExercise,
  updateExercise,
  deleteExercise,
};
