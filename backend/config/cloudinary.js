import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure your Cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a Multer storage engine that saves to Cloudinary
const birdStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Birds",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        resource_type: "image",
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

// Export Multer middleware
export const parser = multer({ storage: birdStorage });
