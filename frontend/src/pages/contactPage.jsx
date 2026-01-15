import { Header } from "../ui/header"; // adjust path if needed

export const ContactPage = () => {
    return (
        <div className="px-4 py-8 md:px-12 md:py-12 max-w-3xl mx-auto">
            {/* Page title */}
            <Header className="font-oi text-3xl md:text-4xl text-red-700 mb-6">
                Get in Touch
            </Header>

            {/* Subtitle / intro */}
            <p className="text-gray-700 text-base md:text-lg mb-8">
                Have questions about our knitted chickens? Want to order a custom friend or just say hi?
                We’d love to hear from you!
            </p>

            {/* Contact form */}
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="border-2 border-dashed border-red-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="border-2 border-dashed border-red-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <textarea
                    placeholder="Your Message"
                    className="border-2 border-dashed border-red-700 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-700"
                />
                <button
                    type="submit"
                    className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition"
                >
                    Send Message
                </button>
            </form>

            {/* Fun note */}
            <p className="text-gray-500 text-sm mt-6 text-center">
                We promise to reply before our knitted chickens start wandering off!
            </p>
        </div>
    );
};
