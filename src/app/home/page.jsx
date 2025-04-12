"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useProfileImage } from "@/context/ProfileImageContext";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";
import Switch from "@/components/Switch";

const page = () => {
    const { profileImage } = useProfileImage();
    const { fullName } = useUser();
    const { language, setLanguageToEnglish, setLanguageToArabic } =
        useLanguage();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const { updateProfileImage } = useProfileImage();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                updateProfileImage(imageUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLanguageToggle = (e) => {
        if (e.target.checked) {
            setLanguageToArabic();
        } else {
            setLanguageToEnglish();
        }
    };

    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove("token");
        toast.dark("logged out successfully!");
        router.push("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Header */}
            <header>
                <div className="w-full flex items-center p-4 justify-between">
                    <div
                        className="flex items-center relative left-3.5 top-0"
                        ref={menuRef}
                    >
                        <Image
                            src={profileImage || "/defult.png"}
                            alt="Profile Picture"
                            width={55}
                            height={55}
                            className="w-14 h-14 rounded-full border border-gray-300"
                            onClick={toggleMenu}
                        />
                        {menuVisible && (
                            <ul
                                id="menu"
                                className="absolute top-16 left-0 bg-white border border-gray-300 rounded-xl shadow-xl w-40 p-2 justify-center items-center space-y-2"
                            >
                                <li className="text-center font-bold hover:bg-gray-200 transition ease-in-out">
                                    <span className="font-bold text-lg">
                                        {fullName ||
                                            (language === "en"
                                                ? "User"
                                                : "مستخدم")}
                                    </span>
                                </li>
                                <li className="hover:bg-gray-100 transition ease-in-out cursor-pointer">
                                    <label className="flex items-center justify-center cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <VscGitPullRequestGoToChanges className="text-5xl" />
                                        <span className="ml-4 font-bold">
                                            {language === "en"
                                                ? "Change Picture"
                                                : "تغيير الصورة"}
                                        </span>
                                    </label>
                                </li>
                                {/* Toggle Switch for Language */}
                                <li>
                                    <Switch
                                        language={language}
                                        setLanguageToEnglish={
                                            setLanguageToEnglish
                                        }
                                        setLanguageToArabic={
                                            setLanguageToArabic
                                        }
                                    />
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="flex justify-center items-center hover:bg-gray-200 transition ease-in-out cursor-pointer"
                                >
                                    <FiLogOut className="text-2xl" />
                                    <span className="ml-4 font-bold">
                                        {language === "en"
                                            ? "Logout"
                                            : "تسجيل الخروج"}
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <Link href="/info">
                        <Image
                            src="/info.svg"
                            alt="icon"
                            width={35}
                            height={30}
                            className=""
                            layout="intrinsic"
                        />
                    </Link>
                </div>
            </header>

            <main className="pt-44">
                {/* Buttons Section */}
                <div className="flex flex-wrap justify-center gap-x-41 gap-y-10 -mt-28">
                    <Link
                        href="/upload"
                        className="bg-green-600 text-black px-4 py-7 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/uploadimage.svg"
                            alt="Upload"
                            width={35}
                            height={35}
                            priority={true}
                        />
                        <span className="mt-2 font-semibold font-serif">
                            {language === "en" ? "Upload Image" : " رفع صورة"}
                        </span>
                    </Link>

                    <Link
                        href="/common"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/common.svg"
                            alt="Diseases"
                            width={30}
                            height={30}
                            priority={true}
                            layout="intrinsic"
                        />
                        <span className="mt-2 font-semibold font-serif">
                            {language === "en"
                                ? "Common Diseases"
                                : "الأمراض الشائعة"}
                        </span>
                    </Link>

                    <Link
                        href="/report"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/report.svg"
                            alt="Report"
                            width={30}
                            height={30}
                            priority={true}
                            layout="intrinsic"
                        />
                        <span className="mt-2 font-serif font-semibold">
                            {language === "en"
                                ? "Report a Problem"
                                : "الإبلاغ عن مشكلة"}
                        </span>
                    </Link>

                    <Link
                        href="/usage"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/tips.svg"
                            alt="Tips"
                            width={30}
                            height={30}
                            priority={true}
                            layout="intrinsic"
                        />
                        <span className="mt-2 font-serif font-semibold">
                            {language === "en"
                                ? "Fertilizers Usage Tips"
                                : "نصائح استخدام الأسمدة"}
                        </span>
                    </Link>
                </div>
            </main>

            {/* { Footer Image */}
            <footer>
                <div className="absolute left-0 bottom-16">
                    <Link href="/chatbot">
                        <Image
                            src="/ai.svg"
                            alt="AI Elements"
                            width={70}
                            height={50}
                            priority={true}
                            layout="intrinsic"
                        />
                    </Link>
                </div>
            </footer>
        </>
    );
};

export default page;
