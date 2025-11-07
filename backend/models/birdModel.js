import mongoose from "mongoose";

const { Schema } = mongoose;

const birdSchema = new Schema(
    {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        available: { type: Boolean, default: true },
        material: { type: String },
        amount: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

// 👇 export the model, not the schema
export default mongoose.model("Bird", birdSchema);
