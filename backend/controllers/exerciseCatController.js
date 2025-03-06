const ExerciseCategory = require("../models/ExerciseCatModel");
const path = require("path");
const fs = require("fs");

// Get all exercise categories
const getExerciseCategories = async (req, res) => {
  try {
    const categories = await ExerciseCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Add a new exercise category (supports both image URL & file upload)
const addExerciseCategory = async (req, res) => {
  try {
    const { name, imgUrl } = req.body;
    const imgPath = req.file ? `/images/${req.file.filename}` : imgUrl || "";

    const newCategory = new ExerciseCategory({
      name,
      img: imgPath,
      route: `/${name.toLowerCase().replace(/\s+/g, "-")}`,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing category (supports both image URL & file upload)
const updateExerciseCategory = async (req, res) => {
  const { id } = req.params;
  const { name, imgUrl } = req.body;
  let imgPath = "";

  try {
    const existingCategory = await ExerciseCategory.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.file) {
      // Correct file path
      const oldImagePath = path.join(
        __dirname,
        "../images",
        path.basename(existingCategory.img)
      );

      // Delete old image if it's not a URL
      if (existingCategory.img && !existingCategory.img.startsWith("http")) {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        } else {
          console.warn(`File not found: ${oldImagePath}`);
        }
      }

      imgPath = `/images/${req.file.filename}`;
    } else {
      imgPath = imgUrl || existingCategory.img;
    }

    const updatedCategory = await ExerciseCategory.findByIdAndUpdate(
      id,
      { name, img: imgPath },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExerciseCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await ExerciseCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (deletedCategory.img && !deletedCategory.img.startsWith("http")) {
      const imagePath = path.join(
        __dirname,
        "../images",
        path.basename(deletedCategory.img)
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`File not found: ${imagePath}`);
      }
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getExerciseCategories,
  addExerciseCategory,
  updateExerciseCategory,
  deleteExerciseCategory,
};
