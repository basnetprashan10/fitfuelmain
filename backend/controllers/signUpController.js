const Signup = require("../models/userModel");
const Bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    // Fetch users excluding the password field
    const users = await Signup.find().select("-password");
    res.status(200).json({ message: "success", data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  const { fullname, username, email, age, gender, password, user_type } =
    req.body;

  if (!fullname || !username || !email || !age || !gender || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  try {
    // Hash password
    const hashpassword = await Bcrypt.hash(password, 10);

    // Set user_type to 'user' if not provided
    const newUser = await Signup.create({
      fullname,
      username,
      email,
      age,
      gender,
      password: hashpassword,
      user_type: user_type || "user", // Default role is "user" if not provided
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
// Edit user function
const editUser = async (req, res) => {
  const { id } = req.params; // User ID from URL parameters
  const { fullname, username, email, age, gender, user_type } = req.body;

  try {
    const updatedUser = await Signup.findByIdAndUpdate(
      id,
      { fullname, username, email, age, gender, user_type },
      { new: true, runValidators: true } // Return the updated document and run validation
    ).select("-password"); // Exclude the password field

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete user function
const deleteUser = async (req, res) => {
  const { id } = req.params; // User ID from URL parameters

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

module.exports = { signUp, getUser, editUser, deleteUser };
