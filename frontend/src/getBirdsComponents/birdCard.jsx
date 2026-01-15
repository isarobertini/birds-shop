import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useCart } from "../context/cartContext";

const BASE_URL = import.meta.env.VITE_API_URL;

export const BirdCard = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [bird, setBird] = useState();

    useEffect(() => {
        fetch(`${BASE_URL}/birds/${id}`)
            .then(res => res.json())
            .then(setBird)
            .catch(console.error);
    }, [id]);

    if (!bird) return <p className="text-gray-700 text-center py-8">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 border-2 border-red-700 border-dashed rounded-lg bg-yellow-50 shadow-sm">
            <div className="flex justify-center mb-6">
                <img
                    src={bird.image}
                    alt={bird.name}
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-md"
                />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-oi text-red-700 mb-4 text-center">
                {bird.name}
            </h1>
            <div className="text-gray-700 text-sm md:text-base space-y-1 mb-6 text-center">
                <p><span className="font-medium">Size:</span> {bird.size}cm</p>
                <p><span className="font-medium">Material:</span> {bird.material}</p>
                <p><span className="font-medium">In Stock:</span> {bird.amount}</p>
                <p><span className="font-medium">Price:</span> {bird.price}kr</p>
            </div>
            <div className="flex justify-center">
                <Button onClick={() => addToCart(bird)}>Add to cart</Button>
            </div>
        </div>
    );
};
