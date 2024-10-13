// index.js
import express from "express";
import connectDB from "./config.js"; // Ensure this exports a function to connect to MongoDB
import userRoutes from "./routes/user.js";
import employeeRoutes from "./routes/employee.js";

// Start Express server
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
await connectDB(); 

// Register routes
app.use('/api/v1/user', userRoutes); // User routes
app.use('/api/v1/emp', employeeRoutes); // Employee routes

const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});