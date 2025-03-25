"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

export default function ImageUploader() {
    const [uploadedImage, setUploadedImage] = useState(null);

    // تحميل الصورة المخزنة عند فتح الصفحة
    useEffect(() => {
        const savedImage = localStorage.getItem("uploadedImage");
        if (savedImage) {
            setUploadedImage(savedImage);
        }
    }, []);

    // حفظ الصورة في localStorage عند الرفع
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                localStorage.setItem("uploadedImage", reader.result);
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // حذف الصورة من localStorage
    const removeImage = () => {
        localStorage.removeItem("uploadedImage");
        setUploadedImage(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
    });

    return (
        <div className="flex flex-col items-center font-bold text-3xl">
            {!uploadedImage && (
                <div
                    {...getRootProps()}
                    className="border-3 border-dashed border-green-700 w-3xl h-51 flex justify-center items-center cursor-pointer bg-transparent hover:scale-105 transition"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-700"> Drop photo here...</p>
                    ) : (
                            <p className="text-gray-500">
                                Drag & Drop your image here, or click to select
                        </p>
                    )}
                </div>
            )}

            {uploadedImage && (
                <motion.div
                    className="mt-4 bg-white p-4 rounded-lg shadow-lg flex flex-col items-center border border-gray-200"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-40 h-40 object-cover rounded-md shadow-md"
                    />
                    <motion.p
                        className="mt-2 text-gray-600 text-sm text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        تم تحميل الصورة بنجاح! هذه الصورة سيتم استخدامها لتصنيف
                        أمراض النباتات.
                    </motion.p>
                    <button
                        onClick={removeImage}
                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Delete Photo  ❌
                    </button>
                </motion.div>
            )}
        </div>
    );
}
