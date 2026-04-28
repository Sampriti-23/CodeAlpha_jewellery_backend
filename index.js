const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors= require("cors");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // Trust your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Domain"], // <-- Explicitly allow 'Domain'
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));