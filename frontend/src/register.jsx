import { useState } from "react";
import { Button } from "./ui/Button";

export const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Welcome, ${form.name}! Registration is not fully implemented yet 🐣`);
        // Here you would send form data to backend
    };

    return (
        <div className="px-4 py-8 md:px-12 md:py-12 max-w-md mx-auto border-2 border-red-700 border-dashed rounded-lg bg-yellow-50 shadow-sm">
            <h1 className="text-3xl font-oi font-bold text-red-700 mb-6 text-center">
                Join the Cozy Chicken Club
            </h1>

            <p className="text-gray-700 text-sm md:text-base mb-6 text-center">
                Register to receive updates about our knitted chickens, new designs, and special offers!
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border-2 border-red-700 border-dashed rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border-2 border-red-700 border-dashed rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border-2 border-red-700 border-dashed rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                    required
                />

                <Button type="submit" className="mt-2">
                    Register
                </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
                By registering, you agree to our friendly chicken rules 🐣
            </p>
        </div>
    );
};
