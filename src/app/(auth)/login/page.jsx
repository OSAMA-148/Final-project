"use client";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { login } from "@/action/auth";


const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const result = await login(null, new FormData(e.target));

        if (result.errors) {
            setErrors(result.errors);
        } else {
            alert("Login successful!");
            window.location.href = "/home"; // ✅ التوجيه بعد تسجيل الدخول
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center gap-2 flex-col w-full h-full pb-15"
        >
            <div className="relative mb-4">
                <FaUser className="absolute left-3 top-3 text-gray-400 text-2xl" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full pl-15 pr-15 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email[0]}</p>
                )}
            </div>

            <div className="relative mb-4">
                <FaLock className="absolute left-3 top-3 text-gray-400 text-2xl" />
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-15 pr-15 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 text-3xl"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                </button>
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password[0]}</p>
                )}
            </div>

            <button
                type="submit"
                className="mx-auto py-2 bg-blue-500 text-white rounded-full text-center px-28 disabled:bg-gray-500 cursor-pointer hover:bg-blue-600 transition-all duration-200"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-center">
                <span className="font-medium">Don't have an account?</span>
                <Link href="/register" className="text-blue-500 ml-1 underline">
                Register
                </Link>
            </div>
        </form>
    );
};

export default Login;
