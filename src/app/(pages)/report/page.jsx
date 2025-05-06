"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLanguage } from "@/context/LanguageContext"; // ← استيراد اللغة
import { MdFeedback } from "react-icons/md";

const API_BASE_URL2 = process.env.NEXT_PUBLIC_API_BASE_URL2;

const Report = () => {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const texts = {
        en: {
            placeholder: "Describe Your Problem",
            send: "Send",
            sending: "Sending...",
            success: "Report sent successfully!",
            error: "Failed to send the report. Please try again.",
            viewProblems: "my problems",
        },
        ar: {
            placeholder: "صف مشكلتك",
            send: "إرسال",
            sending: "جارٍ الإرسال...",
            success: "تم إرسال التقرير بنجاح!",
            error: "فشل في إرسال التقرير. حاول مرة أخرى.",
            viewProblems: "مشاكلي",
        },
    };

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);

        try {
            const token = Cookies.get("token");
            await axios.post(
                `${API_BASE_URL2}/ReportProblem`,
                { descripcion: text },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                    },
                }
            );

            toast.success(texts[language].success);
            setText("");
        } catch (error) {
            toast.error(texts[language].error);
            console.error("❌ Error while sending the report:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full lg:mb-[195px] mb-27 relative">

            <div className="w-full lg:w-[70%] flex flex-col items-center">
                <textarea
                    placeholder={texts[language].placeholder}
                    className="w-full h-40 border border-gray-300 rounded-lg p-5 text-gray-700 text-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 resize-none shadow-xl transition"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className={`mt-3 font-semibold py-3 px-20 rounded-full text-lg shadow-md transition duration-300 ${
                        text.trim() && !loading
                            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!text.trim() || loading}
                >
                    {loading ? texts[language].sending : texts[language].send}
                </button>
            </div>
        </div>
    );
};

export default Report;
