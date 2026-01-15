import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const PostedBirdList = () => {
    const { user, token } = useAuth();
    const [birds, setBirds] = useState([]);
    const [editingBirdId, setEditingBirdId] = useState(null); // currently editing
    const [editForm, setEditForm] = useState({});
    const BASE_URL = import.meta.env.VITE_API_URL;

    if (!user || user.role !== "admin") {
        return (
            <p className="text-center text-red-500 mt-8">
                Access denied — admins only
            </p>
        );
    }

    const fetchBirds = async () => {
        try {
            const res = await fetch(`${BASE_URL}/birds`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setBirds(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBirds();
    }, []);

    const deleteBird = async (birdId) => {
        if (!confirm("Are you sure you want to delete this bird?")) return;

        try {
            const res = await fetch(`${BASE_URL}/birds/${birdId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert("Bird deleted successfully!");
            setBirds(prev => prev.filter(b => b._id !== birdId));
        } catch (err) {
            console.error(err);
            alert("Failed to delete bird");
        }
    };

    const startEditing = (bird) => {
        setEditingBirdId(bird._id);
        setEditForm({
            name: bird.name,
            price: bird.price,
            amount: bird.amount,
            material: bird.material || "",
            size: bird.size || "",
        });
    };

    const cancelEditing = () => {
        setEditingBirdId(null);
        setEditForm({});
    };

    const saveEdit = async (birdId) => {
        try {
            const res = await fetch(`${BASE_URL}/birds/${birdId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editForm),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert("Bird updated successfully!");
            cancelEditing();
            fetchBirds(); // refresh list
        } catch (err) {
            console.error(err);
            alert("Failed to update bird");
        }
    };

    return (
        <div className="px-4 md:px-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {birds.map(bird => (
                    <li key={bird._id}>
                        <div className="rounded-md p-4 flex flex-col items-center border border-gray-200">
                            <Link to={`/birds/${bird._id}`} className="w-full text-center hover:underline">
                                <img className="rounded-md object-cover w-full h-48 mb-3" src={bird.image} alt={bird.name} />
                                <h2 className="font-medium text-lg mb-2">{bird.name}</h2>
                                <div className="text-sm text-gray-700 space-y-1 mb-4">
                                    <p>Price: {bird.price}kr</p>
                                    <p>Stock: {bird.amount}</p>
                                </div>
                            </Link>

                            {editingBirdId === bird._id ? (
                                <div className="flex flex-col gap-2 w-full">
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Name"
                                        className="border px-2 py-1 rounded"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.price}
                                        onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                                        placeholder="Price"
                                        className="border px-2 py-1 rounded"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.amount}
                                        onChange={e => setEditForm({ ...editForm, amount: Number(e.target.value) })}
                                        placeholder="Stock amount"
                                        className="border px-2 py-1 rounded"
                                    />
                                    <input
                                        type="text"
                                        value={editForm.material}
                                        onChange={e => setEditForm({ ...editForm, material: e.target.value })}
                                        placeholder="Material"
                                        className="border px-2 py-1 rounded"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.size}
                                        onChange={e => setEditForm({ ...editForm, size: Number(e.target.value) })}
                                        placeholder="Size"
                                        className="border px-2 py-1 rounded"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <Button onClick={() => saveEdit(bird._id)}>Save</Button>
                                        <Button variant="secondary" onClick={cancelEditing}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-2 mt-2">
                                    <Button onClick={() => deleteBird(bird._id)}>Delete bird</Button>
                                    <Button variant="secondary" onClick={() => startEditing(bird)}>Edit bird</Button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
