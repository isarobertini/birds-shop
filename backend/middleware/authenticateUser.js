import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const authenticationUser = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, response: "No or invalid token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, response: "Token missing" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded?.id) return res.status(401).json({ success: false, response: "Invalid token payload" });

        const user = await UserModel.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ success: false, response: "User not found" });

        req.user = {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, response: "Token expired" });
        }
        return res.status(401).json({ success: false, response: "Invalid token" });
    }
};
