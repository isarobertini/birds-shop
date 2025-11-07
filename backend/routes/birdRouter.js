import express from "express";
import { parser } from "../config/cloudinary.js";
import { buyBird, checkoutCart, deleteBirdCart, deleteCart, getBirds, postBird, updateCartQuantity } from "../controllers/birdController.js";
import { authenticationUser } from "../middleware/authenticateUser.js";

const router = express.Router();

//GET all birds
router.get("/", getBirds);

//POST birds
router.post("/", parser.single("image"), postBird);

// PUT a bird into the user's cart
router.put("/cart/:birdId", buyBird);

// PATCH to update bird quantity in cart
router.patch("/cart/:birdId", updateCartQuantity);


// DELETE a bird FROM the user's cart
router.delete("/cart/:birdId", deleteBirdCart);

// DELETE cart
router.delete("/cart", deleteCart);

// Simulated checkout route
router.put("/cart", authenticationUser, checkoutCart);


export default router;
