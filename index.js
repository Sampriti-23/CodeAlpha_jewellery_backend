const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cardRoutes");
const wishlistRoutes = require('./routes/wishlistRoutes');
const recommendRoutes = require("./routes/recommendRoutes");
const path = require('path');

dotenv.config();

const app = express();

// 🔥 CORS FIX (supports multiple frontend ports)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔥 Parse JSON
app.use(express.json());

// 🔥 Connect DB
connectDB();

// 🔥 Routes
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use("/api/recommendations", recommendRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔥 Server start
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});