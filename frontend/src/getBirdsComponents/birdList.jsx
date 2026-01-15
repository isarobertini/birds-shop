import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";

export const BirdList = () => {
    const [birds, setBirds] = useState([]);
    const { addToCart } = useCart();
    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${BASE_URL}/birds`)
            .then(res => res.json())
            .then(data => setBirds(data))
            .catch(console.error);
    }, []);

    return (
        <div className="px-4 md:px-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {birds.map((bird) => (
                    <li key={bird._id}>
                        <div className="rounded-md p-4 flex flex-col items-center">
                            <Link to={`/birds/${bird._id}`} className="w-full text-center">
                                <img
                                    src={bird.image}
                                    alt={bird.name}
                                    className="w-full h-48 mb-3 object-cover rounded-md"
                                />
                                <h2 className="font-medium text-lg mb-2">{bird.name}</h2>
                            </Link>
                            <p className="text-gray-700">Price: {bird.price}kr</p>
                            <button
                                onClick={() => addToCart(bird)}
                                className="bg-red-700 text-white py-2 px-4 rounded mt-2"
                            >
                                Add to cart
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
