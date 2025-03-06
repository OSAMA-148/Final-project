"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const diseases = [
    {
        id: 1,
        name: "Leaf Blight",
        image: "/leaf-blight.jpg",
        description: "Fungal disease affecting leaves.",
    },
    {
        id: 2,
        name: "Powdery Mildew",
        image: "/powdery-mildew.webp",
        description: "White powder-like fungal infection.",
    },
    {
        id: 3,
        name: "Root Rot",
        image: "/Root-Rot.webp",
        description: "Caused by overwatering and poor drainage.",
    },
];

export default function DiseasesPage() {
    const [search, setSearch] = useState("");

    const filteredDiseases = diseases.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 flex flex-col items-center pt-28">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-700 font-bold text-2xl mb-4"
            >
                🌿 Common Regional Diseases
            </motion.h2>

            {/* Search Input */}
            <motion.input
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                type="text"
                placeholder="Search for a disease..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md border border-gray-300 p-2 rounded-md mb-6"
            />

            {/* Disease Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {filteredDiseases.map((disease) => (
                    <motion.div
                        key={disease.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white p-4 rounded-lg shadow-md w-72 text-center cursor-pointer"
                    >
                        <img
                            src={disease.image}
                            alt={disease.name}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-bold text-lg">{disease.name}</h3>
                        <p className="text-gray-600 text-sm">
                            {disease.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
