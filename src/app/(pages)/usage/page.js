"use client";
import { motion } from "framer-motion";
const tips = [
    {
        id: 1,
        text: "Use Organic Fertilizers",
        desc: "They improve soil health and plant growth.",
    },
    {
        id: 2,
        text: "Apply Fertilizers in the Morning",
        desc: "Helps plants absorb nutrients efficiently.",
    },
    {
        id: 3,
        text: "Avoid Over-Fertilizing",
        desc: "Too much fertilizer can damage plant roots.",
    },
    {
        id: 4,
        text: "Use Different Fertilizers for Different Plants",
        desc: "Each plant has unique nutrient needs.",
    },
];
const Usage = () => {
    return (
        <div className="p-8 pb-0 max-w-lg mx-auto w-full">
            <motion.h2
                className="text-green-700 font-bold text-xl flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                🌱 Fertilizers Usage Tips
            </motion.h2>
            <div className="mt-4 space-y-4 flex flex-col items-center">
                {tips.map((tip, index) => (
                    <motion.div
                        key={tip.id}
                        className="p-4 border rounded-lg shadow-md bg-transparent w-full"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <strong>{tip.text}</strong>: {tip.desc}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Usage;
