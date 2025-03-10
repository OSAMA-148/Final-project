"use client";
import Link from "next/link";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadPhoto from "@/components/uploadPhoto";
import { register } from "@/action/auth";
import { ClipLoader } from "react-spinners";
import { useUser } from "@/context/UserContext";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setFullName } = useUser();






    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const result = await register(null, new FormData(e.target), router);

        if (result.errors) {
            setErrors(result.errors);
        } else {
            const registeredFullName = formData.name; // ← استخراج الاسم الحقيقي
            setFullName(registeredFullName); // ← حفظ الاسم الحقيقي في السياق
            localStorage.setItem("fullName", registeredFullName); // ← تخزين الاسم الحقيقي في localStorage
            router.push("/login");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-6">
            {/* زر الرجوع */}
            <Link href="/login" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack className="text-gray-600" />
            </Link>

            {/* الفورم */}
            <form
                className="w-full max-w-sm space-y-4 mt-48 lg:mt-20"
                onSubmit={handleSubmit}
            >
                {/* صورة البروفايل */}
                <div className="flex">
                    <UploadPhoto />
                </div>

                {/* اسم المستخدم */}
                <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name[0]}</p>
                    )}
                </div>

                {/* البريد الإلكتروني */}
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-Mail"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                {/* كلمة المرور */}
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 text-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password[0]}
                        </p>
                    )}
                </div>

                {/* تأكيد كلمة المرور */}
                <div className="relative">
                    <FaLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 text-2xl"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword[0]}
                        </p>
                    )}
                </div>

                {/* زر التسجيل */}
                <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-2 rounded-full text-lg font-semibold shadow-md hover:bg-green-800 transition duration-300 disabled:bg-gray-500"
                    disabled={loading}
                >
                    {loading ? (
                        <ClipLoader color="#ffffff" size={30} />
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;
