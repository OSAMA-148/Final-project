"use client";
import { useLanguage } from "@/context/LanguageContext"; // ← استيراد اللغة

export default function NotFound() {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية

    const texts = {
        en: {
            title: "🔒 404 - Page Not Found",
            message: "You must log in first to access this page.",
            button: "Go to Login Page",
        },
        ar: {
            title: "🔒 404 - الصفحة غير موجودة",
            message: "يجب تسجيل الدخول أولاً للوصول إلى هذه الصفحة.",
            button: "اذهب إلى صفحة تسجيل الدخول",
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-800 pb-24">
            <h1 className="text-2xl font-bold">{texts[language].title}</h1>
            <p>{texts[language].message}</p>
            <a
                href="/login"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition duration-200"
            >
                {texts[language].button}
            </a>
        </div>
    );
}
