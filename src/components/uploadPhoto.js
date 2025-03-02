"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function UploadPhoto({ onImageUpload }) {
    const [image, setImage] = useState(null);

    // تحميل الصورة من localStorage عند تحميل الصفحة
    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                setImage(imageData);
                onImageUpload(imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex justify-center items-center mb-2">
            {" "}
            {/* تقليل المسافات */}
            <label
                htmlFor="photo-upload"
                className="relative w-15 h-15 rounded-full overflow-hidden border-2 border-gray-400 shadow-md"
            >
                <Image
                    width={20}
                    height={20}
                    objectFit="cover"
                    layout="responsive"
                    src={image || "/defult.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
                <input
                    type="file"
                    id="photo-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
            <div className="flex flex-col items-center ml-2">
                <span className="font-semibold text-gray-700 text-sm">
                    Upload
                </span>
                <span className="text-xs text-gray-400">Photo</span>
            </div>
        </div>
    );
}
