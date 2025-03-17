const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save to /images/exercise/ path
    cb(null, path.join(__dirname, "../images/exercise"));
  },
  filename: (req, file, cb) => {
    // Use original name and append date to avoid duplicates
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${file.fieldname}${uniqueSuffix}`); // e.g., "img1678923487654.jpg"
  },
});

const upload = multer({ storage });

const {
  getExercisesByCategory,
  getAllExercises,
  addExercise,
  updateExercise,
  deleteExercise,
} = require("../controllers/exerciseController");

router.get("/:category", getExercisesByCategory);
router.get("/", getAllExercises);
router.post("/", upload.single("img"), addExercise); // Add a new exercise
router.put("/:id", upload.single("img"), updateExercise); // Update an exercise
router.delete("/:id", deleteExercise); // Delete an exercise

module.exports = router;
