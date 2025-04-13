"use client";
import axios from "axios";
import { RegisterFormSchema } from "@/lib/rules";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchData(endpoint, method, body) {
    try {
        const { data } = await axios({
            method,
            url: `${API_BASE_URL}/${endpoint}`,
            data: body,
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });

        if (
            !data ||
            (typeof data === "object" && Object.keys(data).length === 0)
        ) {
            throw new Error("لم يتم استلام بيانات من السيرفر.");
        }

        return data;
    } catch (error) {
        const errorMessage =
            error.response?.data?.errors?.join(", ") ||
            error.response?.data?.title ||
            error.response?.data?.message ||
            error.message ||
            "حدث خطأ غير متوقع. يُرجى المحاولة لاحقًا.";

        console.error(`❌ خطأ في ${endpoint}:`, errorMessage);
        throw new Error(errorMessage);
    }
}

// ✅ دالة التسجيل
export async function register(state, formData, router) {
    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        };
    }

    try {
        await fetchData("register", "POST", {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });

        toast.success("Registration successful! Please log in now.");
        router.push("/login");

        return { success: true };
    } catch (error) {
        const errorMessage = error.message || "An unexpected error occurred.";
        return {
            errors: { email: [errorMessage] }, // ← تمرير الخطأ إلى email
        };
    }
}

// ✅ دالة تسجيل الدخول
export const useLogin = () => {
    const queryClient = useQueryClient(); // ← إنشاء QueryClient

    const login = async (formData, router) => {
        const data = new FormData();
        data.append("Email", formData.email);
        data.append("Password", formData.password);

        try {
            const response = await fetchData("login", "POST", data, true);

            const { token } = response;

            if (!token) {
                throw new Error("لم يتم استلام التوكن من السيرفر.");
            }

            // ✅ حفظ التوكن في الكوكيز لمدة 7 أيام
            Cookies.set("token", token, { expires: 7 });

            // ✅ تحقق من صلاحية التوكن
            if (!isTokenValid(token)) {
                throw new Error("التوكن غير صالح أو منتهي الصلاحية.");
            }

            // ✅ تحديث اسم المستخدم بعد تسجيل الدخول
            queryClient.invalidateQueries(["userName"]); // ← تحديث بيانات اسم المستخدم

            toast.success("You have successfully logged in!");
            router.push("/home");

            return { success: true };
        } catch (error) {
            const errorMessage =
                error.response?.data?.errors?.join(", ") ||
                error.response?.data?.title ||
                error.response?.data ||
                "Login failed. Check your email or password.";

            console.error("❌ Error in login:", errorMessage);

            return { errors: { general: [errorMessage] } };
        }
    };

    return login;
};

// ✅ دالة فحص التوكن
function isTokenValid(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded && decoded.exp && decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}




// export const getUserNameFromToken = () => {
//     const token = Cookies.get("token");

//     if (!token) return null;

//     try {
//         const decoded = jwt.decode(token);
//         return decoded?.name || null; // استخراج الاسم من التوكن
//     } catch {
//         return null;
//     }
// };
