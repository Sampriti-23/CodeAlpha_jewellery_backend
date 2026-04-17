const express= require("express");
const {register, login}=require("../controller/authcontroller");
const router =express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);


module.exports = router;
