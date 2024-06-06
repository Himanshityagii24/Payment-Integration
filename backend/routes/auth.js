import express from 'express';
import crypto from 'crypto';
import User from '../models/User.js';

const router = express.Router();

// Function to hash the password using crypto
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Route for user signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password: hashPassword(password), // Hash the password using crypto
    });

    // Save the user to the database
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
