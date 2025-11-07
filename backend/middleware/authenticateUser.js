import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";

//secret key for verifying JWTS
const JWT_SECRET = process.env.JWT_SECRET || "secret key";

//Middleware authentication users
export const authenticationUser = async (req, res, next) => {

    //extract the auth header from request
    const authHeader = req.header("Authorization");

    //chech if the header exist and starts with "bearer"
    if (!authHeader?.startsWith("Bearer")) {

        //401 unauth
        return res.status(401).json({ success: false, response: "No or invalid token provided" });
    }
    //extract the token part
    const token = authHeader.split(" ")[1];

    try {
        //verifying token using secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        //find user in database, exept password
        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, response: "Invalid token" });
        }
        //attach the user to reqest object
        req.user = user;

        //proceed route
        next();

    } catch (error) {
        return res.status(401).json({ success: false, response: "Token expired or invalid" });
    }
};
