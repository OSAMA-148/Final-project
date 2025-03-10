import { ToastContainer } from "react-toastify";
import "./globals.css";
import ContextProviders from "@/context/ContextProviders";
export const metadata = {
    title: "DR-PLANT",
    description: "تطبيق كشف أمراض النباتات",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">
                <ToastContainer position="top-center" autoClose={2000} />
                <ContextProviders>{children}</ContextProviders>
            </body>
        </html>
    );
}
