import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

// 👇 import the router — note: no curly braces and include .js
import birdRouter from "./routes/birdRouter.js";

const app = express();
app.use(express.json());

// default route
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// 👇 use your router
app.use("/api/birds", birdRouter);

// connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
