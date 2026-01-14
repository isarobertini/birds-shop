import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Hash admin password from env
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        // Create admin user
        const admin = new UserModel({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"
        });

        const savedAdmin = await admin.save();
        console.log("✅ Admin user created:", savedAdmin);

        process.exit(0);
    } catch (err) {
        console.error("❌ Error creating admin:", err);
        process.exit(1);
    }
};

createAdmin();
