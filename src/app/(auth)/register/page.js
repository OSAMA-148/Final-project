"use client";
import Link from "next/link";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import UploadPhoto from "@/components/uploadPhoto";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col items-center min-h-screen  p-6">
            {/* رجوع */}
            <Link href="/login" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack className="text-gray-600" />
            </Link>

            {/* الفورم */}
            <form className="w-full max-w-sm space-y-4 mt-48 lg:mt-20">
                {/* صورة البروفايل واللوجو */}
                <div className="flex">
                    <UploadPhoto />
                </div>
                {/* اسم المستخدم */}
                <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* البريد الإلكتروني */}
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="email"
                        placeholder="E-Mail"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* كلمة المرور */}
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                </div>

                {/* زر التسجيل */}
                <div className="w-full bg-green-700 text-white py-2 rounded-full text-lg font-semibold shadow-md hover:bg-green-800 transition duration-300">
                    <Link
                        href="/home"
                        className="block text-center"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
