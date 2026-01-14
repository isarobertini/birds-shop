import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import birdRouter from "./routes/birdRouter.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CORS setup
if (process.env.NODE_ENV === "production") {
    // Only allow your frontend in production
    app.use(cors({ origin: process.env.FRONTEND_URL }));
} else {
    // Allow all origins in development
    app.use(cors());
}

// Default route
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// API routes
app.use("/api/birds", birdRouter);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
