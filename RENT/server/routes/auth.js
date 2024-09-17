const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const path = require("path");
const dotenv = require("dotenv").config();
const { deepEqual } = require("assert");

// Configuration of multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store upload file in uploads folder
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    // const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname);
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure correctly

    // Check if user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // Return error for invalid password
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Exclude password from the returned user object
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
