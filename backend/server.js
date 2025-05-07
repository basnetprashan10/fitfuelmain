const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the database

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS
app.use("/images", express.static(path.join(__dirname, "images"))); // Serve static images

// Routes
app.use("/api/signup", require("./routes/signUpRoute"));
app.use("/api/login", require("./routes/loginRoute"));
app.use("/api/dashboard", require("./routes/loginRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/exercisecategory", require("./routes/exerciseCatRoutes"));
app.use("/api/exercises", require("./routes/exerciseRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/hire-trainer", require("./routes/hireTrainerRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/foodlog", require("./routes/foodLogRoute"));

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details
  res.status(500).json({ message: "An internal server error occurred" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
