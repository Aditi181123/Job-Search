const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { authenticate } = require('../middleware/authenticate');
const mongoose = require('mongoose');

const router = express.Router();

// Signing up a new User
router.post('/signup', async (req, res) => {
    const { 
        name, 
        email, 
        contactNo, 
        password, 
        role, 
    } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User
        const newUser = await User.create({
            name,
            email,
            contactNo,
            password: hashedPassword,
            role,
        });

        // Generate JWT
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || "temp", // Use environment variable for production
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "temp", // Use environment variable for production
            { expiresIn: '1h' }
        );

        // Add token in cookies with secure setting for production
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction, // Only set secure cookies in production
            sameSite: "None",      // Required for cross-origin cookies
            expires: new Date(Date.now() + 3600000), // 1 hour
        });

        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging In', error: error.message });
    }
});

// Get the authenticated user's profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password') // Do not send the password in the response
            .populate('company'); // Ensure 'company' is a valid reference

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// Update the authenticated user's profile
router.put('/profile', authenticate, async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true })
            .select('-password'); // Do not send the password in the response

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Delete the authenticated user's profile
router.delete('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
});

module.exports = router;
