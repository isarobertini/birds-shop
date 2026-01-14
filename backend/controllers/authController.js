import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel.js";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// ----------------- Helper: Generate JWT -----------------
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role || "user" }, // include role in token
        JWT_SECRET,
        { expiresIn: "1d" } // token expires in 1 day
    );
};

// ----------------- Register a new user (shopper) -----------------
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            role: "user", // default role for shoppers
        });

        const savedUser = await newUser.save();

        // Generate JWT
        const token = generateToken(savedUser);

        res.status(201).json({
            token,
            user: { id: savedUser._id, username, email, role: savedUser.role }
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ----------------- Login user (owner or shopper) -----------------
export const loginUser = async (req, res) => {
    try {
        const { email, password, expectedRole } = req.body;

        if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        if (expectedRole && user.role !== expectedRole) {
            return res.status(403).json({ error: `This login form is only for ${expectedRole}s` });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

