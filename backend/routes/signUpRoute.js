const express = require("express");
const router = express.Router();
const {
  signUp,
  getUser,getAllUser,
  editUser,
  deleteUser,
  getUserCount,
} = require("../controllers/signUpController");

// Route to sign up a new user
router.post("/", signUp);

// Route to get  user details for user
router.get("/getuser/:id", getUser);

// Route to get user details for admin
router.get("/getalluser/", getAllUser);

// Route to get the total count of users
router.get("/usercount", getUserCount);

// Route to edit user details by ID
router.put("/edituser/:id", editUser);

// Route to delete a user by ID
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
