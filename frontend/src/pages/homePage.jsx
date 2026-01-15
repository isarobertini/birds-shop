import { Nav } from "../common/nav";
import { Header } from "../ui/header";
import { AppRoutes } from "../routes/AppRoutes";
import { Footer } from "../common/footer";
import { CartProvider } from "../context/cartContext";

export const HomePage = () => {
    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <Nav />
                <main className="flex-grow">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
};
