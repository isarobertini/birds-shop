import Bird from "../models/birdModel.js";
import Cart from "../models/cartModel.js";

// POST a new bird to the shop
export const postBird = async (req, res) => {
    try {
        const { name, size, material, amount, price, description } = req.body;

        // Validate required text fields
        if (!name || !size || !amount || !price) {
            return res.status(400).json({ error: "Missing required field" });
        }

        // Validate image upload
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        const newBird = new Bird({
            name,
            size,
            material,
            amount,
            price,
            description,
            image: req.file.path
        });

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
        const birds = await Bird.find().sort({ createdAt: -1 });
        res.json(birds);
    } catch (error) {
        console.error("Error fetching birds:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// GET the cart for a user, including stock info
export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        let cart = await Cart.findOne({ user: userId }).lean();

        if (!cart) {
            cart = { user: userId, items: [] };
        }

        // Enrich each cart item with the bird's available amount
        const itemsWithStock = await Promise.all(
            cart.items.map(async (item) => {
                const bird = await Bird.findById(item.birdId).lean();
                return {
                    ...item,
                    maxQuantity: bird ? bird.amount : 10, // fallback if bird not found
                };
            })
        );

        res.json({ ...cart, items: itemsWithStock });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};



//GET a bird by id
export const getBirdbyId = async (req, res) => {
    try {
        const bird = await Bird.findById(req.params.id);
        if (!bird) return res.status(404).json({ message: "Bird not found" });
        res.json(bird);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// PUT a bird into the user's cart (add or increment quantity)
export const buyBird = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity = 1 } = req.body;
        const userId = req.user._id;

        const bird = await Bird.findById(birdId);
        if (!bird) return res.status(404).json({ error: "Bird not found" });

        let cart = await Cart.findOne({ user: userId });
        if (!cart) cart = new Cart({ user: userId, items: [] });

        const itemIndex = cart.items.findIndex(
            item => item.birdId.toString() === birdId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += parseInt(quantity);
        } else {
            cart.items.push({
                birdId: bird._id,
                name: bird.name,
                price: bird.price,
                image: bird.image,
                quantity: parseInt(quantity),
            });
        }

        await cart.save();
        res.json(cart);

    } catch (error) {
        console.error("Error adding bird to cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// PATCH to update quantity of a bird in cart
export const updateCartQuantity = async (req, res) => {
    try {
        const { birdId } = req.params;
        const { quantity } = req.body;
        const userId = req.user._id;

        const qty = parseInt(quantity);
        if (!qty || qty < 1) {
            return res.status(400).json({ error: "Invalid quantity" });
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        const item = cart.items.find(
            item => item.birdId.toString() === birdId
        );
        if (!item) return res.status(404).json({ error: "Bird not in cart" });

        item.quantity = qty;
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// DELETE a bird from the cart
export const deleteBirdCart = async (req, res) => {
    try {
        const { birdId } = req.params;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ error: "Cart not found" });

        cart.items = cart.items.filter(
            item => item.birdId.toString() !== birdId
        );

        await cart.save();
        res.json({ message: "Bird removed from cart" });

    } catch (error) {
        console.error("Error deleting bird from cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE the entire cart
export const deleteCart = async (req, res) => {
    try {
        const userId = req.user._id;

        await Cart.findOneAndDelete({ user: userId });

        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Simulated checkout (no real payment yet)
export const checkoutCart = async (req, res) => {
    try {
        const userId = req.user._id;

        res.json({
            message: `Checkout simulation for user ${userId}`
        });
    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ error: "Server error during checkout" });
    }
};


// DELETE a bird from the shop (owner action)
export const deleteBird = async (req, res) => {
    try {
        const birdId = req.params.id;

        const bird = await Bird.findById(birdId);
        if (!bird) return res.status(404).json({ error: "Bird not found" });

        await bird.deleteOne();
        res.status(200).json({ message: "Bird deleted successfully" });
    } catch (err) {
        console.error("Error deleting bird:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// PATCH /birds/:id — update bird info (admin only)
export const updateBird = async (req, res) => {
    try {
        const birdId = req.params.id;
        const { name, price, amount, material, size, description } = req.body;

        const bird = await Bird.findById(birdId);
        if (!bird) return res.status(404).json({ error: "Bird not found" });

        // Update only the provided fields
        if (name !== undefined) bird.name = name;
        if (price !== undefined) bird.price = price;
        if (amount !== undefined) bird.amount = amount;
        if (material !== undefined) bird.material = material;
        if (size !== undefined) bird.size = size;
        if (description !== undefined) bird.description = description;

        await bird.save();
        res.json({ message: "Bird updated successfully", bird });
    } catch (err) {
        console.error("Error updating bird:", err);
        res.status(500).json({ error: "Server error" });
    }
};

