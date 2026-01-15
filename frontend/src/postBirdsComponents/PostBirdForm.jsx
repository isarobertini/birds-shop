import { useState } from "react";
import { useAuth } from "../context/authContext";

const BASE_URL = import.meta.env.VITE_API_URL; // backend URL

export const PostBirdForm = () => {
    const { user, token } = useAuth(); // get logged-in user and token
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // ---------------- Admin check ----------------
    if (!user || user.role !== "admin") {
        return (
            <p className="text-center text-red-500 mt-8">
                Access denied — admins only
            </p>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please select an image");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("size", size);
        formData.append("material", material);
        formData.append("amount", amount);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch(`${BASE_URL}/birds`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // include JWT token
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to add bird");

            setMessage("Bird added successfully 🐔");
            setName("");
            setSize("");
            setMaterial("");
            setAmount("");
            setPrice("");
            setDescription("");
            setImage(null);
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong while uploading the bird.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Add New Bird</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount in stock"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-700 text-white py-2 rounded"
                >
                    {loading ? "Uploading..." : "Add Bird"}
                </button>
                {message && <p className="mt-2">{message}</p>}
            </form>
        </div>
    );
};
