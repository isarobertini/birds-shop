import Bird from "../models/birdModel.js";
import Cart from "../models/cartModel.js";

// POST a new bird to the shop
export const postBird = async (req, res) => {
    try {
        const { name, size, material, amount, price, description, image } = req.body;

        // Return 400 if any required field is missing
        if (!name || !size || !amount || !price) {
            return res.status(400).json({ error: "Missing required field" });
        }

        // Create a new bird document
        const newBird = new Bird({
            name,
            size,
            material,
            amount,
            price,
            description,
            image: req.file.path
        });

        // Save to database
        const savedBird = await newBird.save();
        res.status(201).json(savedBird);

    } catch (error) {
        console.error("Error posting bird:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// GET all birds
export const getBirds = async (req, res) => {
    try {
        const birds = await Bird.find();
        res.json(birds);
    } catch (error) {
        console.error("Error fetching birds:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// PUT a bird into the user's cart (add or increment quantity)
export const buyBird = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity = 1, userId } = req.body;

        // Find the bird
        const bird = await Bird.findById(birdId);
        if (!bird) return res.status(404).json({ error: "Bird not found" });

        // Find or create the user's cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [] });

        // Check if bird is already in cart
        const itemIndex = cart.items.findIndex(item => item.birdId.toString() === birdId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += parseInt(quantity);
        } else {
            cart.items.push({
                birdId: bird._id,
                name: bird.name,
                price: bird.price,
                quantity: parseInt(quantity),
            });
        }

        const updatedCart = await cart.save();
        res.json(updatedCart);

    } catch (error) {
        console.error("Error adding bird to cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// PATCH to update quantity of a bird in cart
export const updateCartQuantity = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity, userId } = req.body;

        const qty = parseInt(quantity);
        if (!qty || qty < 1) return res.status(400).json({ error: "Invalid quantity" });

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.birdId.toString() === birdId);
        if (itemIndex === -1) return res.status(404).json({ error: "Bird not in cart" });

        cart.items[itemIndex].quantity = qty;

        const updatedCart = await cart.save();
        res.json(updatedCart);

    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE a bird from the cart
export const deleteBirdCart = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        cart.items = cart.items.filter(item => item.birdId.toString() !== birdId);

        await cart.save();
        res.status(200).json({ message: "Bird removed from cart successfully!" });

    } catch (error) {
        console.error("Error deleting bird from cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE the entire cart
export const deleteCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        await cart.deleteOne();
        res.status(200).json({ message: "Cart deleted successfully!" });

    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Simulated checkout (no real payment yet)
export const checkoutCart = async (req, res) => {
    try {
        const userId = req.body.userId || "guest"; // Use "guest" if no userId provided
        res.json({
            message: `Checkout simulation for user ${userId}. Payment functionality under development.`
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ error: "Server error during checkout" });
    }
};
