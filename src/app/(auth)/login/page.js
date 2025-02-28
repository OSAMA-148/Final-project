"use client";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <form className="flex justify-center items-center gap-5 flex-col w-full h-full pb-14">
                {/* User Input */}
                <div className="relative mb-4">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="User Name"
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
                {/* Login Button */}
                <div className="relative mb-4" id="login">
                    <Link
                        href="home"
                        className="w-full py-2 bg-blue-500 text-white rounded-full text-center px-28 "
                    >
                        Login
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Login;
