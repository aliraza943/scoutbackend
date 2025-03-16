const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, phoneNumber, address, dateOfBirth, role, governmentIDFront, governmentIDBack } = req.body;

  try {
    // Check if user already exists
    if (!firstName || !lastName || !phoneNumber || !address || !dateOfBirth) {
      return res.status(400).json({ message: "Missing required parametrs" });
    }
    let user = await User.findOne({ phoneNumber });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    userData = new User({
      firstName,
      lastName,
      phoneNumber,
      address,
      dateOfBirth,
      role,
    });

    if (role === "user") {
      if (!governmentIDFront || !governmentIDBack) {
        return res.status(400).json({ message: "Government ID front and back are required" });
      }
      userData.governmentIDFront = governmentIDFront;
      userData.governmentIDBack = governmentIDBack;
    }

    user = new User(userData);

    await user.save();

    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  // console.log("<----Login--->");
  const { phoneNumber } = req.body;

  try {
    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const user = await User.findOne({ phoneNumber });
    // console.log("Found User-->", user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.json({ message: "Login successful",user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;