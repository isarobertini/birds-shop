import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

// Base URL of backend API
const BASE_URL = import.meta.env.VITE_API_URL;

export const LoginPage = () => {
    const { login } = useAuth(); // Access login function
    const navigate = useNavigate();

    // ---------------- Owner login ----------------
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerPassword, setOwnerPassword] = useState("");
    const [ownerError, setOwnerError] = useState("");

    // ---------------- Shopper login ----------------
    const [shopperEmail, setShopperEmail] = useState("");
    const [shopperPassword, setShopperPassword] = useState("");
    const [shopperError, setShopperError] = useState("");

    //  Shopper registration 
    const [username, setUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regError, setRegError] = useState("");


    // Admin login 
    const handleOwnerLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: ownerEmail, password: ownerPassword, expectedRole: "admin" })
            });
            if (!res.ok) throw new Error("Invalid credentials");
            const data = await res.json();
            login(data.token, data.user); // user.role is included
            navigate(data.user.role === "admin" ? "/admin" : "/");
        } catch (err) {
            console.error(err);
            setOwnerError("Owner login failed");
        }
    };

    // Shopper login
    const handleShopperLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: shopperEmail, password: shopperPassword, expectedRole: "user" })
            });
            if (!res.ok) throw new Error("Invalid credentials");
            const data = await res.json();
            login(data.token, data.user);
            navigate("/"); // regular user homepage
        } catch (err) {
            console.error(err);
            setShopperError("Shopper login failed");
        }
    };

    // ---------------- Shopper registration ----------------
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email: regEmail, password: regPassword })
            });
            if (!res.ok) throw new Error("Registration failed");
            const data = await res.json();
            login(data.token, data.user); // auto-login after registration
            navigate("/");
        } catch (err) {
            console.error(err);
            setRegError("Registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Login / Register</h1>

            {/* Owner login */}
            <form onSubmit={handleOwnerLogin} className="flex flex-col gap-4">
                <h2 className="font-semibold">Owner Login</h2>
                <input
                    type="email"
                    placeholder="Owner Email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={ownerPassword}
                    onChange={(e) => setOwnerPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-red-700 text-white py-2 rounded">
                    Login
                </button>
                {ownerError && <p className="text-red-500">{ownerError}</p>}
            </form>

            {/* Shopper login */}
            <form onSubmit={handleShopperLogin} className="flex flex-col gap-4">
                <h2 className="font-semibold">Shopper Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={shopperEmail}
                    onChange={(e) => setShopperEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={shopperPassword}
                    onChange={(e) => setShopperPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-700 text-white py-2 rounded">
                    Login
                </button>
                {shopperError && <p className="text-red-500">{shopperError}</p>}
            </form>

            {/* Shopper registration */}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <h2 className="font-semibold">Shopper Registration</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                />
                <button type="submit" className="bg-green-700 text-white py-2 rounded">
                    Register & Login
                </button>
                {regError && <p className="text-red-500">{regError}</p>}
            </form>
        </div>
    );
};
