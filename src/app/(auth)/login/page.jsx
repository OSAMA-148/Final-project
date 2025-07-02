"use client";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { useLogin } from "@/action/auth";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useLogin();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const result = await login(formData, router);

        if (result.errors) {
            setErrors(result.errors);
        } else {
            router.push("/home");
        }

        setLoading(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center bg-white gap-2 flex-col h-full "
            >
                <div className="relative mb-4 ">
                    <FaUser className="absolute left-3 top-3 text-gray-400 text-2xl" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full pl-15 pr-15 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                    />
                    {errors.general && (
                        <p className="text-red-500 text-sm">
                            {errors.general[0]}
                        </p>
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
                        className="w-full pl-15 pr-15 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 text-3xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                    {errors.general && (
                        <p className="text-red-500 text-sm">
                            {errors.general[0]}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="mx-auto py-2 bg-blue-500 text-white rounded-full text-center px-30 disabled:bg-gray-500 cursor-pointer hover:bg-blue-600 transition-all duration-200"
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader color="#ffffff" size={30} />
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="flex justify-center">
                    <span className="font-serif font-bold">
                        Don't have an account?
                    </span>
                    <Link
                        href="/register"
                        className="text-blue-500 ml-1.5 hover:underline hover:text-blue-600 font-bold "
                    >
                        Register
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Login;
