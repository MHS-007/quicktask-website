const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register a user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
    message: "User registered successfully",
    user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    },
});

  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong during registration" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // token expiry optional
    });

    // ✅ Send token along with user info
    res.status(200).json({
      message: "Login successful",
      token, // ✅ this is what Postman will show now
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong during login" });
  }
};

module.exports = { registerUser, loginUser };
