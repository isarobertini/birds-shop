import express from "express";
import { parser } from "../config/cloudinary.js";
import { buyBird, checkoutCart, deleteBirdCart, deleteCart, getBirdbyId, getBirds, getCart, postBird, updateCartQuantity, deleteBird } from "../controllers/birdController.js";
import { authenticationUser } from "../middleware/authenticateUser.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

//POST birds
router.post("/", authenticationUser, adminOnly, parser.single("image"), postBird);

//GET all birds
router.get("/", getBirds);

// GET user's cart
router.get("/cart", authenticationUser, getCart);

//GET one bird by Id
router.get("/:id", getBirdbyId);

// PUT a bird into the user's cart
router.put("/cart/:birdId", authenticationUser, buyBird);

// PATCH to update bird quantity in cart
router.patch("/cart/:birdId", authenticationUser, updateCartQuantity);

// DELETE a single bird from cart
router.delete("/cart/:birdId", authenticationUser, deleteBirdCart);

// DELETE entire cart
router.delete("/cart", authenticationUser, deleteCart);

// Simulated checkout route
router.put("/cart", authenticationUser, checkoutCart);

// DELETE bird (owner)
router.delete("/:id", authenticationUser, adminOnly, deleteBird);

export default router;

