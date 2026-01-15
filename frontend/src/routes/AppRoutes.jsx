import { Routes, Route } from "react-router-dom";
import { BirdList } from "../getBirdsComponents/birdList";
import { BirdCard } from "../getBirdsComponents/birdCard";
import { BirdCart } from "../getBirdsComponents/birdCart";
import { ContactPage } from "../pages/contactPage";
import { AboutPage } from "../pages/aboutPage";
import { Register } from "../register";
import { AdminPage } from "../pages/adminPage";
import { LoginPage } from "../pages/loginPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<BirdList />} />
            <Route path="/birds/:id" element={<BirdCard />} />
            <Route path="/cart" element={<BirdCart />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
};
