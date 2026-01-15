import { useCart } from "../context/cartContext";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export const BirdCart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        alert("This is as far as you can go — payment not implemented yet.")
    };

    return (
        <div className="px-4 py-8 md:px-12 md:py-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-oi font-bold text-red-700 mb-6 text-center">Your Knitted Chickens Cart</h1>

            {cart.items.length === 0 ? (
                <p className="text-gray-700 text-center mb-6">Your cart is empty 🐣 Start adding some cozy chickens!</p>
            ) : (
                <ul className="flex flex-col gap-4 mb-6">
                    {cart.items.map((item) => (
                        <li key={item.birdId} className="border-2 border-red-700 border-dashed rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-md object-cover" />
                                <div>
                                    <h2 className="font-medium text-lg">{item.name}</h2>
                                    <p className="text-sm text-gray-700">Price: {item.price}kr</p>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <select value={item.quantity} onChange={(e) => updateQuantity(item.birdId, parseInt(e.target.value))} className="border-2 border-red-700 border-dashed rounded px-2 py-1">
                                    {Array.from({ length: item.maxQuantity }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                                <Button onClick={() => removeFromCart(item.birdId)}>Remove</Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <p className="text-right font-medium text-gray-800 mb-6">Total: {totalPrice}kr</p>

            <div className="flex flex-col md:flex-row justify-end gap-4">
                <Button onClick={handleCheckout}>Proceed to checkout</Button>
                <Button onClick={clearCart} variant="secondary">Clear Cart</Button>
            </div>
        </div>
    );
};
