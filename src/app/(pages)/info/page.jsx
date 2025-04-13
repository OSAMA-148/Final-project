"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext"; // ← استيراد اللغة

export default function InfoPage() {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية

    const texts = {
        en: {
            title: "🌿 About DR-PLANT",
            description:
                "DR-PLANT helps farmers and plant lovers detect diseases using AI-powered image analysis. Simply upload a photo of your plant, and we’ll provide instant diagnosis and recommendations.",
            howItWorks: "How It Works:",
            steps: [
                "📸 Upload a plant image.",
                "🧐 AI analyzes the disease.",
                "📋 Get diagnosis & treatment tips.",
            ],
        },
        ar: {
            title: "🌿 عن DR-PLANT",
            description:
                "DR-PLANT يساعد المزارعين ومحبي النباتات في اكتشاف الأمراض باستخدام تحليل الصور المدعوم بالذكاء الاصطناعي. قم فقط برفع صورة لنباتك، وسنقدم لك التشخيص والتوصيات فورًا.",
            howItWorks: "كيف يعمل:",
            steps: [
                "📸 قم برفع صورة للنبات.",
                "🧐 يقوم الذكاء الاصطناعي بتحليل المرض.",
                "📋 احصل على التشخيص ونصائح العلاج.",
            ],
        },
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center mt-1.5 lg:mb-48 pb-15 lg:pb-0 px-1 lg:px-0">
            <motion.h1
                className="lg:text-3xl font-bold text-green-700 lg:mb-2"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {texts[language].title}
            </motion.h1>

            <motion.p
                className="text-gray-700 text-center max-w-4xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                {texts[language].description}
            </motion.p>

            <motion.div
                className="lg:py-6 pb-16 lg:px-32 shadow-l rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-green-600">
                    {texts[language].howItWorks}
                </h2>
                <ul className="list-disc list-inside mt-2 text-gray-600 font-bold wxl">
                    {texts[language].steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
