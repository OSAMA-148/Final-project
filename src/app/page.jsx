"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Link
                    href="/login"
                    className="bg-blue-500 w-48 py-2 px-32 rounded-full text-2xl text-white text-center min-w-[200px] hover:bg-blue-600 transition duration-300"
                >
                    Login
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Link
                    href="/register"
                    className="bg-green-700 w-48 py-2 px-29 rounded-full text-2xl text-white text-center min-w-[200px] hover:bg-green-800 transition duration-300"
                >
                    Register
                </Link>
            </motion.div>
        </div>
    );
}
