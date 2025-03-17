const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Login handler
const login = async (req, res) => {
  const { loginInput, password } = req.body;

  // Check if login input and password are provided
  if (!loginInput || !password) {
    return res.status(400).json({ message: "Fill Username/Email & Password" });
  }

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: loginInput }, { email: loginInput }],
    });

    // If user not found
    if (!user) {
      return res.status(400).json({ message: "Invalid username or email" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        user_type: user.user_type,
        fullname: user.fullname,
        email: user.email,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        bmr: user.bmr,
        weight: user.weight,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Send response with token and user details
    res.json({
      message: "Login successful",
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        age: user.age,
        gender: user.gender,
        bio: user.bio,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
