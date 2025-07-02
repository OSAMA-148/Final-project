"use client";
import Link from "next/link";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/action/auth";
import { ClipLoader } from "react-spinners";
import { useUser } from "@/context/UserContext";
import UploadPhoto from "@/components/UploadPhoto";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [profileImage, setProfileImage] = useState(null);

    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const [showPasswordValidation, setShowPasswordValidation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setFullName } = useUser();
    const passwordInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        setPasswordValidation({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[^a-zA-Z0-9]/.test(password),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); // ← إعادة تعيين الأخطاء

        const result = await register(null, new FormData(e.target), router);

        if (result.errors) {
            setErrors(result.errors); // ← تحديث الأخطاء
        } else {
            router.push("/login");
        }

        setLoading(false);
    };

    // إخفاء القائمة عند النقر خارج الحقل
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                passwordInputRef.current &&
                !passwordInputRef.current.contains(event.target)
            ) {
                setShowPasswordValidation(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">

            <form
                className="w-full max-w-md lg:max-w-lg space-y-4 mt-5 relative"
                onSubmit={handleSubmit}
            >
                {/* اسم المستخدم */}
                <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm lg:text-base"
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
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm lg:text-base"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                {/* كلمة المرور */}
                <div className="relative" ref={passwordInputRef}>
                    <FaLock className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setShowPasswordValidation(true)}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm lg:text-base"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 text-2xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>

                    {/* الرسالة المنبثقة */}
                    {showPasswordValidation && (
                        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-full z-10">
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li
                                    className={`flex items-center ${
                                        passwordValidation.length
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {passwordValidation.length ? "✔️" : "❌"} At
                                    least 8 characters
                                </li>
                                <li
                                    className={`flex items-center ${
                                        passwordValidation.uppercase
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {passwordValidation.uppercase ? "✔️" : "❌"}{" "}
                                    At least one uppercase letter
                                </li>
                                <li
                                    className={`flex items-center ${
                                        passwordValidation.lowercase
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {passwordValidation.lowercase ? "✔️" : "❌"}{" "}
                                    At least one lowercase letter
                                </li>
                                <li
                                    className={`flex items-center ${
                                        passwordValidation.number
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {passwordValidation.number ? "✔️" : "❌"} At
                                    least one number
                                </li>
                                <li
                                    className={`flex items-center ${
                                        passwordValidation.specialChar
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {passwordValidation.specialChar
                                        ? "✔️"
                                        : "❌"}{" "}
                                    At least one special character (!@#$%^&*)
                                </li>
                            </ul>
                        </div>
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
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm lg:text-base"
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
                    disabled={
                        !Object.values(passwordValidation).every((v) => v)
                    }
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
