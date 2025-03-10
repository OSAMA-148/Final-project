"use client";

import Image from "next/image";
import { useProfileImage } from "@/context/ProfileImageContext";

export default function UploadPhoto() {
    const { profileImage, updateProfileImage } = useProfileImage();

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result;
                updateProfileImage(imageData); // تحديث الصورة عبر السياق
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center mb-2">
            <label
                htmlFor="photo-upload"
                className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-400 shadow-md cursor-pointer"
            >
                <Image
                    width={80}
                    height={80}
                    objectFit="cover"
                    layout="responsive"
                    src={profileImage || "/default.png"}
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
            <div className="flex flex-col items-center mt-2">
                <span className="font-semibold text-gray-700 text-sm">
                    Upload
                </span>
                <span className="text-xs text-gray-400">Photo</span>
            </div>
        </div>
    );
}
