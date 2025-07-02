import { ToastContainer } from "react-toastify";
import Image from "next/image";
import "./globals.css";
import ContextProviders from "@/context/ContextProviders";
export const metadata = {
    title: "DR-PLANT",
    description: "تطبيق كشف أمراض النباتات",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased w-screen h-screen">
                <div className=" h-screen w-screen overflow-hidden">
                    <Image src="/logo.png" alt="logo" width={120} height={60} className="absolute top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2" />
                    <ToastContainer position="top-center" autoClose={1000} />
                    <ContextProviders>{children}</ContextProviders>
                </div>
            </body>
        </html>
    );
}
