const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, getUserAccount } = require('../Controllers/user.controller');
const authMiddleware = require('../Config/authMiddleware');


const router = express.Router();

// Register Route
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    registerUser
);

// Login Route
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);
router.get("/:userId/posts", getUserAccount);
router.get('/profile', authMiddleware , (req, res) => {
    res.json(req.user);
});

module.exports = router