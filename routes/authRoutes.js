const express= require("express");
const {register, login,register_admin}=require("../controller/authcontroller");
const router =express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

//registration for admin
router.post("/register_admin", register_admin);

module.exports = router;