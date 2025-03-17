const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save images in the /images/ directory
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original file extension
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${file.fieldname}${uniqueSuffix}`); // e.g., "img1678923487654.jpg"
  },
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage });

// Import controller functions for exercise categories
const {
  getExerciseCategories,
  addExerciseCategory,
  updateExerciseCategory,
  deleteExerciseCategory,
} = require("../controllers/exerciseCatController");

// Define routes for handling exercise categories
router.get("/", getExerciseCategories); // Get all exercise categories
router.post("/", upload.single("img"), addExerciseCategory); // Add a new category with image
router.put("/:id", upload.single("img"), updateExerciseCategory); // Update existing category
router.delete("/:id", deleteExerciseCategory); // Delete an exercise category

// Export the router to be used in the main application
module.exports = router;
