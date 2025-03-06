const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images")); // Save to /images/ path
  },
  filename: (req, file, cb) => {
    // Use original name and append date to avoid duplicates
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${file.fieldname}${uniqueSuffix}`); // e.g., "img1678923487654.jpg"
  },
});

const upload = multer({ storage });

const {
  getExerciseCategories,
  addExerciseCategory,
  updateExerciseCategory,
  deleteExerciseCategory,
} = require("../controllers/exerciseCatController");

router.get("/", getExerciseCategories);
router.post("/", upload.single("img"), addExerciseCategory);
router.put("/:id", upload.single("img"), updateExerciseCategory);
router.delete("/:id", deleteExerciseCategory);

module.exports = router;
