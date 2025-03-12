"use client";
import { motion } from "framer-motion";

export default function InfoPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center mb-48 bg-ambe-200">
            <motion.h1
                className="text-3xl font-bold text-green-700 mb-2"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🌿 About DR-PLANT
            </motion.h1>

            <motion.p
                className="text-gray-700 text-center max-w-4xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                DR-PLANT helps farmers and plant lovers detect diseases using
                AI-powered image analysis. Simply upload a photo of your plant,
                and we’ll provide instant diagnosis and recommendations.
            </motion.p>

            <motion.div
                className="py-6 px-32 shadow-l rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-green-600">
                    How It Works:
                </h2>
                <ul className="list-disc list-inside mt-2 text-gray-600 font-bold wxl">
                    <li>📸 Upload a plant image.</li>
                    <li>🧐 AI analyzes the disease.</li>
                    <li>📋 Get diagnosis & treatment tips.</li>
                </ul>
            </motion.div>


        </div>
    );
}
