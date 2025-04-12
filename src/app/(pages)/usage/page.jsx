"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const tips = {
    en: [
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
    ],
    ar: [
        {
            id: 1,
            text: "استخدم الأسمدة العضوية",
            desc: "تحسن صحة التربة ونمو النباتات.",
        },
        {
            id: 2,
            text: "قم بتطبيق الأسمدة في الصباح",
            desc: "يساعد النباتات على امتصاص العناصر الغذائية بكفاءة.",
        },
        {
            id: 3,
            text: "تجنب الإفراط في التسميد",
            desc: "الكثير من السماد يمكن أن يضر بجذور النباتات.",
        },
        {
            id: 4,
            text: "استخدم أسمدة مختلفة للنباتات المختلفة",
            desc: "كل نبات له احتياجات غذائية فريدة.",
        },
    ],
};

const Usage = () => {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية

    return (
        <div className="p-8 mx-auto w-6xl h-[65%]">
            <motion.h2
                className="text-green-700 font-bold text-4xl flex items-center justify-center mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {language === "en"
                    ? "🌱 Fertilizers Usage Tips"
                    : "🌱 نصائح استخدام الأسمدة"}
            </motion.h2>
            <div className="mt-4 flex items-center justify-center space-x-2.5">
                {tips[language].map((tip, index) => (
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
