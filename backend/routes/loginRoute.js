const express = require("express");
const { login } = require("../controllers/loginController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Route to handle user login
router.post("/", login);

// Route to verify the token and return user data if authorized
router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Access Granted", user: req.user });
});

module.exports = router;
