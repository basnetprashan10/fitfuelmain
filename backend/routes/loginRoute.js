const express = require("express");
const { login } = require("../controllers/loginController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", login);

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Access Granted", user: req.user });
});

module.exports = router;
