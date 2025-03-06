const express = require("express");
const router = express.Router();
const { signUp, getUser, editUser, deleteUser } = require("../controllers/signUpController");

router.post("/", signUp);
router.get("/getuser", getUser);
router.put("/edituser/:id", editUser)
router.delete("/deleteuser/:id", deleteUser)

module.exports = router;
