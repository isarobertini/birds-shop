import mongoose from "mongoose";

const { Schema } = mongoose;

const cartItemSchema = new mongoose.Schema({
    birdId: { type: mongoose.Schema.Types.ObjectId, ref: "Bird", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [cartItemSchema]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema)