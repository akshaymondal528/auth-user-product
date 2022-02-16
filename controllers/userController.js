const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/userModel');

// @desc    Register new user
// @route   POST /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    res.status(400);
    throw new Error('Please add all the fields');
  }
  // Check user
  const userExists = await Users.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create user
  const user = await Users.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // Check user
  const user = await Users.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get user data
// @route   POST /users/details
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, username } = await Users.findById(
    req.user.id,
  );
  res.status(200).json({
    id: _id,
    username: username,
    name: `${firstName} ${lastName}`,
  });
});

// Generate jwt token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
