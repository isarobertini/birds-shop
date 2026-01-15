import { Link } from "react-router-dom";
import { Header } from "../ui/header";
import { useAuth } from "../context/authContext";
import { Button } from "../ui/Button";
import { useState } from "react";
import { useCart } from "../context/cartContext";

export const Nav = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <nav className="bg-white shadow-md px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
                    <Header className="flex items-center gap-2">
                        Chicken out
                        <img
                            src="https://img.icons8.com/?size=100&id=9207&format=png&color=000000"
                            alt="Logo"
                            className="w-8 h-8 md:w-10 md:h-10"
                        />
                    </Header>
                </Link>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                <div
                    className={`flex-col md:flex md:flex-row md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ${menuOpen ? "flex" : "hidden"
                        }`}
                >
                    <Link to="/about" className="px-4 py-2 hover:text-red-700" onClick={handleLinkClick}>
                        About us
                    </Link>
                    <Link to="/contact" className="px-4 py-2 hover:text-red-700" onClick={handleLinkClick}>
                        Contact
                    </Link>
                    {!user && (
                        <Link to="/login" className="px-4 py-2 hover:text-red-700" onClick={handleLinkClick}>
                            Login
                        </Link>
                    )}
                    <Link to="/cart" className="px-4 py-2 flex items-center relative" onClick={handleLinkClick}>
                        <img
                            src="https://img.icons8.com/?size=100&id=ii6Lr4KivOiE&format=png&color=000000"
                            alt="Cart"
                            className="w-8 h-8 md:w-10 md:h-10"
                        />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {user && (
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4 px-4 py-2">
                            <span>Hi, {user.username}</span>
                            <Button
                                onClick={() => {
                                    logout();
                                    handleLinkClick();
                                }}
                                className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                                Logout
                            </Button>
                        </div>
                    )}

                    {user?.role === "admin" && (
                        <Link to="/admin" className="px-4 py-2" onClick={handleLinkClick}>
                            <Button className="bg-red-700 text-white px-3 py-1 rounded">
                                Admin Dashboard
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
