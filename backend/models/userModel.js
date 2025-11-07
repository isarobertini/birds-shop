import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, minlength: 2, maxlength: 20 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true, minlength: 6 },
    },
    {
        timestamps: true,

    }
);
export const UserModel = mongoose.model("User", userSchema);
