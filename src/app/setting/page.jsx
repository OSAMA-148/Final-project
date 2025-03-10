"use client";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Setting = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();
    const handleLogout = async () => {
        Cookies.remove("token");
        toast.info("تم تسجيل الخروج بنجاح!");

        await new Promise((resolve) => setTimeout(resolve, 500));
        router.replace("/login");
    };

    return (
        <>
            <form className="flex justify-center items-center space-y-5 flex-col w-full h-full pb-14">
                {/* User Input */}
                <div className="relative mb-4">
                    <FaUser className="absolute left-2 top-2 text-gray-500 text-2xl" />
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                {/* Email Input */}
                <div className="relative mb-4">
                    <FaEnvelope className="absolute left-2 top-2 text-gray-500 text-2xl" />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                {/* Password Input */}
                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 text-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                </div>
                {/* Confirm Password Field */}
                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="confirm Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 text-2xl"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                </div>
                {/* Login Button */}
                <div className="relative mb-4 flex flex-col space-y-4">
                    <button
                        href="home"
                        className="w-full bg-green-700 text-white py-2 rounded-full text-lg font-semibold px-24 hover:bg-green-900 transition-colors duration-250"
                    >
                        Register
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white py-2 rounded-full text-lg font-semibold px-24 hover:bg-red-700 transition-colors duration-250"
                    >
                        Logout
                    </button>
                </div>
            </form>
        </>
    );
};

export default Setting;
