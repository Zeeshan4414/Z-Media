const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const postModel = require('../models/post.model');

// User Registration Function (Already Implemented)
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error:', error.message); 
        res.status(500).json({ message: 'Server error', error });
    }
};

// User Login Function
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ message: 'User logged in successfully', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password for security
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const getUserAccount = async (req, res) => {
    try {
      const  userId  = req.params.userId;
      console.log("Received userId:", userId); 
      // ✅ Fetch user details
      const user = await User.findById(userId).select("name");
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // ✅ Fetch user's posts
      const posts = await postModel.find({ user: userId }).sort({ createdAt: -1 });
  
      res.json({ user, posts });
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  module.exports = { registerUser, loginUser, getUserProfile , getUserAccount};