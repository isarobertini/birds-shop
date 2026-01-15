import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

const BASE_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [cart, setCart] = useState({ items: [] });

    const enrichCartWithStock = async (cartData) => {
        return Promise.all(
            cartData.items.map(async (item) => {
                try {
                    const res = await fetch(`${BASE_URL}/birds/${item.birdId}`);
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    const bird = await res.json();
                    return { ...item, maxQuantity: bird.amount || 10 };
                } catch {
                    return { ...item, maxQuantity: 10 };
                }
            })
        );
    };

    const fetchCart = async () => {
        try {
            const headers = { "Content-Type": "application/json" };
            if (token && token !== "guest") headers["Authorization"] = `Bearer ${token}`;

            const res = await fetch(`${BASE_URL}/birds/cart`, { headers });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let data = await res.json();

            data.items = await enrichCartWithStock(data);
            setCart(data);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    const addToCart = async (bird, quantity = 1) => {
        try {
            if (!token || token === "guest") {
                alert("Please log in to add to cart!");
                return;
            }
            const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
            const res = await fetch(`${BASE_URL}/birds/cart/${bird._id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ quantity })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let updatedCart = await res.json();
            updatedCart.items = await enrichCartWithStock(updatedCart);
            setCart(updatedCart);
            alert(`${bird.name} added to cart!`);
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart");
        }
    };

    const updateQuantity = async (birdId, quantity) => {
        if (quantity < 1) return;
        try {
            const headers = { "Content-Type": "application/json" };
            if (token && token !== "guest") headers["Authorization"] = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}/birds/cart/${birdId}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ quantity })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            let updatedCart = await res.json();
            updatedCart.items = await enrichCartWithStock(updatedCart);
            setCart(updatedCart);
        } catch (err) {
            console.error(err);
            alert("Failed to update quantity");
        }
    };

    const removeFromCart = async (birdId) => {
        const ok = confirm("Are you sure you want to remove this bird?");
        if (!ok) return;
        try {
            const headers = { "Content-Type": "application/json" };
            if (token && token !== "guest") headers["Authorization"] = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}/birds/cart/${birdId}`, {
                method: "DELETE",
                headers
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            await fetchCart(); // refetch to update
            alert("Bird removed!");
        } catch (err) {
            console.error(err);
            alert("Failed to remove bird");
        }
    };

    const clearCart = async () => {
        const ok = confirm("Are you sure you want to clear your cart?");
        if (!ok) return;
        try {
            const headers = { "Content-Type": "application/json" };
            if (token && token !== "guest") headers["Authorization"] = `Bearer ${token}`;
            const res = await fetch(`${BASE_URL}/birds/cart`, {
                method: "DELETE",
                headers
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setCart({ items: [] });
            alert("Cart cleared!");
        } catch (err) {
            console.error(err);
            alert("Failed to clear cart");
        }
    };

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
