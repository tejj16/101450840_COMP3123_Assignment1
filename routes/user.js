// routes/user.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// POST /api/v1/user/signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        // Respond with success message and user ID
        res.status(201).json({
            message: "User created successfully.",
            user_id: user._id,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// POST /api/v1/user/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if user exists
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        
        // Check password match
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful." });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;