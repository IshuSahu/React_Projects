const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const path = require("path");
const dotenv = require("dotenv").config();
// Configuration of multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage });

// USER REGISTER
router.post("/register", upload.single("profileimg"), async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // The uploaded file is available as req.file
    const profileImage = req.file;
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // Path to the uploaded profile photo
    const profileImagePath = profileImage.path;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // Save the new user
    await newUser.save();
    return res.status(200).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid password not match" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h", // Adjust duration as needed
      });

      // Exclude password from response
      const { password: _, ...userWithoutPassword } = user._doc;

      res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
