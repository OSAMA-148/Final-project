"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import { useLanguage } from "@/context/LanguageContext"; // ← استيراد اللغة

const API_BASE_URL3 = process.env.NEXT_PUBLIC_API_BASE_URL3;

export default function ImageUploader() {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const userToken = Cookies.get("token");

    const texts = {
        en: {
            dragDrop: "Drag & Drop your image here, or click to select",
            dropPhoto: "Drop photo here...",
            scanning: "Scanning...",
            result: "Result",
            cancel: "Cancel ❌",
            analyze: "Analyze 🔍",
            uploadFailed: "❌ Failed to upload image:",
            analyzeFailed: "❌ Failed to analyze image:",
        },
        ar: {
            dragDrop: "اسحب وأفلت صورتك هنا، أو انقر لتحديدها",
            dropPhoto: "أسقط الصورة هنا...",
            scanning: "جارٍ الفحص...",
            result: "Result",
            cancel: "إلغاء ❌",
            analyze: "تحليل 🔍",
            uploadFailed: "❌ فشل رفع الصورة:",
            analyzeFailed: "❌ فشل تحليل الصورة:",
        },
    };

    useEffect(() => {
        const savedImage = localStorage.getItem("uploadedImage");
        if (savedImage) setUploadedImage(savedImage);
    }, []);

    const uploadImageToAPI = async (file) => {
        const formData = new FormData();
        formData.append("File", file);

        try {
            const response = await axios.post(
                `${API_BASE_URL3}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );

            const imageToken = response.data.token;
            localStorage.setItem("imageToken", imageToken);
            setUploadedImage(URL.createObjectURL(file));
        } catch (error) {
            console.error(
                texts[language].uploadFailed,
                error.response?.data || error
            );
        }
    };

    const analyzeImage = async () => {
        const imageToken = localStorage.getItem("imageToken");
        if (!imageToken) {
            console.error("❌ لا يوجد توكين للصورة");
            return;
        }

        setLoading(true);
        setAnalysisResult(null);

        try {
            const response = await axios.post(
                `${API_BASE_URL3}/diagnose`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${imageToken}`,
                    },
                }
            );

            setTimeout(() => {
                setAnalysisResult(response.data);
                setLoading(false);
            }, 2000); // إضافة تأخير بسيط لمحاكاة الفحص
        } catch (error) {
            console.error(
                texts[language].analyzeFailed,
                error.response?.data || error
            );
            setLoading(false);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            uploadImageToAPI(acceptedFiles[0]);
        }
    }, []);

    const removeImage = () => {
        localStorage.removeItem("uploadedImage");
        localStorage.removeItem("imageToken");
        setUploadedImage(null);
        setAnalysisResult(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
    });

    return (
        <div className="flex flex-col items-center font-bold text-xl">
            {!uploadedImage ? (
                <div
                    {...getRootProps()}
                    className="border-3 border-dashed border-green-700 w-3xl font-bold text-3xl h-51 flex justify-center items-center cursor-pointer bg-transparent hover:scale-105 transition"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-700">
                            {texts[language].dropPhoto}
                        </p>
                    ) : (
                        <p className="text-gray-500">
                            {texts[language].dragDrop}
                        </p>
                    )}
                </div>
            ) : (
                <motion.div
                    className="mb-4 bg-white px-7 py-2 rounded-lg shadow-lg flex flex-col items-center border border-gray-200 relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* صورة المستخدم */}
                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="w-full h-40 object-cover rounded-md shadow-md"
                        />
                        {/* تأثير الـ Scanning */}
                        {loading && (
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-50"
                                initial={{ y: "-100%" }}
                                animate={{ y: "100%" }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "linear",
                                }}
                            />
                        )}
                    </div>

                    <motion.p
                        className="mt-2 text-gray-600 text-sm text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    ></motion.p>

                    {/* عرض نتيجة الفحص */}
                    {loading ? (
                        <div className="mt-1 text-blue-600 font-medium">
                            {texts[language].scanning}
                        </div>
                    ) : analysisResult ? (
                        <div className="mt-1 text-gray-700 text-sm text-center border border-green-600 px-2 py-0.5 rounded-lg">
                            <p>
                                {texts[language].result}:{" "}
                                {analysisResult.result}
                            </p>
                        </div>
                    ) : null}

                    {/* أزرار التحكم */}
                    <div className="mt-3 flex space-x-3">
                        <button
                            onClick={removeImage}
                            className="bg-red-600 text-white font-bold p-1.5 rounded-md hover:bg-red-700 transition"
                        >
                            {texts[language].cancel}
                        </button>
                        <button
                            onClick={analyzeImage}
                            className={`p-1.5 rounded-md transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                            disabled={loading}
                        >
                            {texts[language].analyze}
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
