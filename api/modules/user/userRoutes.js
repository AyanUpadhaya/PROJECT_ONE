const express = require("express");
const {
  register,
  login,
  updateUserDetails,
  changePassword,
  updateProfilePicture,
} = require("./userController");
const upload = require("../../utils/multerConfig");

const router = express.Router();
router.use(
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ])
);

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

module.exports = router;
