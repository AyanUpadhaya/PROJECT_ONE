const express = require("express");
const {
  register,
  login,
  updateUserDetails,
  changePassword,
  updateProfilePicture,
  getAllUsers,
} = require("./userController");


const router = express.Router();

//Route to register user
router.post("/register", register); //**
//Route to login user
router.post("/login", login); //**
// Route to update user details
router.put("/users/:user_id", updateUserDetails); //**
// Route to change password
router.put("/users/:user_id/password", changePassword); //**
// Route to change picture
router.patch("/users/:user_id/picture", updateProfilePicture); //**
// Route to get all the users
router.get("/users", getAllUsers);

module.exports = router;
