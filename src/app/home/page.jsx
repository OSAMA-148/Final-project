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
import { RiFeedbackLine } from "react-icons/ri";
import {
    MdTravelExplore,
    MdReportProblem,
    MdOutlineTipsAndUpdates,
} from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";

import {motion} from "framer-motion";

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
                            className="lg:w-14 lg:h-14 w-15 h-15 rounded-full border border-gray-300"
                            onClick={toggleMenu}
                        />
                        {menuVisible && (
                            <ul
                                id="menu"
                                className="absolute top-16 left-0 bg-white border border-gray-300 rounded-xl shadow-xl w-40 p-2 justify-center items-center space-y-2"
                            >
                                <li className="text-center font-bold hover:bg-gray-200 transition ease-in-out">
                                    <span className="font-bold text-xl font-serif">
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
                                <li>
                                    <Link
                                        href="/Feedback"
                                        className="flex items-center justify-center hover:bg-gray-200 transition ease-in-out cursor-pointer"
                                    >
                                        <RiFeedbackLine size={35} />
                                        <span className="ml-5 font-bold">
                                            {language === "en"
                                                ? "Feedback"
                                                : "الآراء"}
                                        </span>
                                    </Link>
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
                                    <FiLogOut size={35} />
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

            <main className="pt-48 lg:pt-42 h-screen">
                {/* Buttons Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:flex lg:flex-wrap lg:justify-center lg:gap-x-41 lg:gap-y-8 -mt-32 grid grid-cols-2 gap-3 p-4"
                >
                    <Link
                        href="/upload"
                        className="bg-green-600 text-white px-2 py-3.5 lg:px-4 lg:py-7 rounded-lg flex flex-col items-center text-center justify-center lg:w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <FaCloudUploadAlt size={35}
                        color="white"/>
                        {/* <Image
                            src="/uploadimage.svg"
                            alt="Upload"
                            width={35}
                            height={35}
                            priority={true}
                        /> */}
                        <span className="mt-2 font-semibold font-serif">
                            {language === "en" ? "Upload Image" : " رفع صورة"}
                        </span>
                    </Link>

                    <Link
                        href="/common"
                        className="bg-green-600 text-white p-1.5 lg:p-6 rounded-lg flex flex-col items-center text-center justify-center lg:w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <MdTravelExplore size={35} color="white" />
                        {/* <Image
                            src="/common.svg"
                            alt="Diseases"
                            width={30}
                            height={30}
                            color="white"
                        /> */}
                        <span className="mt-2 font-semibold font-serif">
                            {language === "en"
                                ? "Common Diseases"
                                : "الأمراض الشائعة"}
                        </span>
                    </Link>

                    <Link
                        href="/report"
                        className="bg-green-600 text-white p-1.5 lg:p-6 rounded-lg flex flex-col items-center text-center justify-center lg:w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <MdReportProblem size={35} color="white" />
                        <span className="mt-2 font-serif font-semibold">
                            {language === "en"
                                ? "Report a Problem"
                                : "الإبلاغ عن مشكلة"}
                        </span>
                    </Link>

                    <Link
                        href="/usage"
                        className="bg-green-600 text-white p-1.5 lg:p-6 rounded-lg flex flex-col items-center justify-center text-center lg:w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <MdOutlineTipsAndUpdates size={35} color="white" />
                        <span className="mt-2 font-serif font-semibold">
                            {language === "en"
                                ? "Fertilizers Usage Tips"
                                : "نصائح استخدام الأسمدة"}
                        </span>
                    </Link>
                </motion.div>
            </main>

            {/* { Footer Image */}
            <footer>
                <div className="absolute left-0 lg:bottom-16 bottom-24">
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
