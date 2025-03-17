const Signup = require("../models/userModel");
const Bcrypt = require("bcryptjs");

// Fetch all users excluding the password field
const getUser = async (req, res) => {
  try {
    const users = await Signup.find().select("-password");
    res.status(200).json({ message: "success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Fetch all users excluding the password field
const getAllUser = async (req, res) => {
  try {
    const users = await Signup.find().select("-password");
    res.status(200).json({ message: "success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get the count of total users, trainers, and sellers
const getUserCount = async (req, res) => {
  try {
    const totalUsers = await Signup.countDocuments({ user_type: "User" });
    const totalTrainers = await Signup.countDocuments({ user_type: "Trainer" });
    const totalSellers = await Signup.countDocuments({ user_type: "Seller" });

    res.status(200).json({
      message: "success",
      data: {
        totalUsers,
        totalTrainers,
        totalSellers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Sign up a new user, hashing the password before saving
const signUp = async (req, res) => {
  const { fullname, username, email, age, gender, password } = req.body;

  if (!fullname || !username || !email || !age || !gender || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  try {
    const hashpassword = await Bcrypt.hash(password, 10); // Hash password

    const newUser = await Signup.create({
      fullname,
      username,
      email,
      age,
      gender,
      password: hashpassword,
    });

    res.status(201).json({
      message: "User added successfully.",
      data: { id: newUser._id, username: newUser.username },
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }
    res.status(500).json({ message: "Internal server error." });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    age,
    gender,
    user_type,
    bio,
    bmr,
    weight,
  } = req.body;

  try {
    const updatedUser = await Signup.findByIdAndUpdate(
      id,
      { fullname, username, email, age, gender, user_type, bio, bmr, weight },
      { new: true, runValidators: true } // Return updated document and validate
    ).select("-password"); // Exclude password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Ensure the response matches what the frontend expects
    res.status(200).json({
      message: "success", // Match the frontend's expected "message" key
      data: updatedUser, // Match the frontend's expected "data" key
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Signup.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User deleted successfully.",
      data: { id: deletedUser._id, username: deletedUser.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  signUp,
  getUser,
  getAllUser,
  editUser,
  deleteUser,
  getUserCount,
};
