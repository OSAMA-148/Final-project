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
        <div className="px-2 lg:p-8 mx-auto w-full lg:w-6xl lg:h-[65%] pb-12">
            <motion.h2
                className="text-green-700 font-bold text-2xl lg:text-4xl flex items-center justify-center lg:mb-10 mb-2 mt-3 lg:mt-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {language === "en"
                    ? "🌱 Fertilizers Usage Tips"
                    : "🌱 نصائح استخدام الأسمدة"}
            </motion.h2>
            <div className="mt-1 lg:mt-4 lg:flex lg:items-center lg:justify-center  grid grid-cols-2 lg:gap-2 gap-y-1 gap-x-9">
                {tips[language].map((tip, index) => (
                    <motion.div
                        key={tip.id}
                        className="p-2 lg:p-4 border rounded-lg shadow-md bg-transparent w-full"
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
