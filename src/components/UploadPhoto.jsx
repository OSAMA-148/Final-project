import { useEffect, useState } from "react";

const UploadPhoto = () => {
    const [image, setImage] = useState(null);

    // تحميل الصورة من localStorage عند فتح الصفحة
    useEffect(() => {
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            setImage(storedImage);
        }
    }, []);

    // دالة لرفع الصورة وحفظها
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;
                setImage(imageData);
                localStorage.setItem("profileImage", imageData);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex items-center space-x-3 ">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dashed border-green-500 shadow-md">
                {image ? (
                    <img
                        src={image}
                        alt="Uploaded"
                        className="w-full h-full object-fill"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-2xl">+</span>
                    </div>
                )}
            </div>

            <label className="text-gray-600 cursor-pointer">
                <strong>Upload</strong> <br /> Photo
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>
        </div>
    );
};

export default UploadPhoto;
