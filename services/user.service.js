import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ShortUrl from "../model/shortUrl.model.js";
dotenv.config();

export const UserLoginService = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Ensure password is a string
    password = String(password);

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const UserRegisterService = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Ensure password is a string
    const plainPassword = String(password);
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create new user
    const newUser = await userModel.create({ email, password: hashedPassword });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserLinksbyId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch user links from the database
    const userLinks = await ShortUrl.find({ userId }).select("originalUrl shortUrl clicked createdAt");
    if (!userLinks || userLinks.length === 0) {
      return res.status(404).json({ error: "No links found for this user" });
    }
    return res.status(200).json({ userLinks });
  } catch (error) {
    console.error("Error fetching user links:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
