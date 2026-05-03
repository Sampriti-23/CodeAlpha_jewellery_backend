const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../utils/config");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../utils/config");

// User Registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if(!name|| !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

     const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
      
        password: passwordHash
    });
    res.status(201).json({
         message: "User registered successfully",
         userid : user._id,
         status_code:201
        });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin ,email: user.email},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      status_code:200,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//admin registration
 exports.register_admin = async (req, res) => {
  try {

      const salt = await bcrypt.genSalt(10);
     const passwordHash = await bcrypt.hash("12345678", salt);

     const user = await User.create({
         name: "Admin",
         email:"admin@yopmail.com",
         password: passwordHash,
         isAdmin: true,
     });
     res.status(201).json({
          message: "User registered successfully",
          userid : user._id,
          status_code:201
         });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };