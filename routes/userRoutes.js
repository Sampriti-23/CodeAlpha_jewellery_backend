const express = require("express");
const router = express.Router();
const usercontroller= require("../controller/usercontroller");

//create user
router.post("/createuser",usercontroller.createuser);

//get all user
router.get("/getalluser", usercontroller.getalluser);

//get user by id
router.get("/getuserbyid/:id", usercontroller.getuserbyid);

//update user by id
router.put("/updateuser/:id", usercontroller.updateuser);

//delete user by id
router.delete("/deleteuser/:id",usercontroller.deleteuser);

module.exports =router;