"use client";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <Link href="/login" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack />
            </Link>
            <form className="flex justify-center items-center space-y-5 flex-col w-full h-full pb-14">
                {/* User Input */}
                <div className="relative mb-4">
                    <FaUser className="absolute left-2 top-2 text-gray-500 text-2xl" />
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Email Input */}
                <div className="relative mb-4">
                    <FaEnvelope className="absolute left-2 top-2 text-gray-500 text-2xl" />
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Password Input */}
                <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="relative mb-4" id="login">
                    <Link
                        href="home"
                        className="w-full bg-green-700 text-white py-2 rounded-full text-lg font-semibold px-24"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Register;
