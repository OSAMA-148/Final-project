import { useState } from "react";

const UploadProfileImage = ({ onImageSelect }) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // عرض معاينة للصورة
            onImageSelect(file); // تمرير الملف للصفحة الرئيسية
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            {/* معاينة الصورة */}
            {preview && (
                <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-14 h-14 rounded-full border-2 border-green-500"
                />
            )}

            {/* حقل اختيار الصورة */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
            />
        </div>
    );
};

export default UploadProfileImage;
