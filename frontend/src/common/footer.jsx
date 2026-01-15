import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-yellow-100 border-t-2 px-4 py-4 md:px-12 md:py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
                {/* Left: Logo / tagline */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold font-oi ">
                        Chicken Out
                    </h2>
                    <p className="text-gray-700 text-sm md:text-base">
                        Your favorite place for cluckin’ good vibes!
                    </p>
                </div>

                {/* Middle: Quick links */}
                <div className="flex flex-wrap justify-center md:justify-center gap-4 text-gray-800">
                    <a href="/" className="hover:underline text-sm md:text-base">Home</a>
                    <a href="/about" className="hover:underline text-sm md:text-base">About Us</a>
                    <a href="/menu" className="hover:underline text-sm md:text-base">Menu</a>
                    <a href="/contact" className="hover:underline text-sm md:text-base">Contact</a>
                    <a href="/faq" className="hover:underline text-sm md:text-base">FAQ</a>
                </div>

                {/* Right: Register button + social */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <Button onClick={() => navigate("/register")}>Register</Button>
                    <div className="flex gap-4 text-red-700">
                        <a href="#" aria-label="Facebook" className=" text-sm md:text-base">FB</a>
                        <a href="#" aria-label="Instagram" className="text-sm md:text-base">IG</a>
                        <a href="#" aria-label="Twitter" className="htext-sm md:text-base">TW</a>
                    </div>
                </div>
            </div>

            {/* Bottom: copyright */}
            <p className="mt-4 text-center text-xs md:mt-6">
                &copy; {new Date().getFullYear()} Chicken Out. All rights reserved.
                Not responsible for runaway chickens or cluck-ups.
            </p>
        </footer>
    );
};
