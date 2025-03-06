const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const login = async (req, res) => {
  const { loginInput, password } = req.body;

  if (!loginInput || !password) {
    return res.status(400).json({ message: "Fill Username/Email & Password" });
  }

  try {
    const user = await User.findOne({
      $or: [{ username: loginInput }, { email: loginInput }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.user_type },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
