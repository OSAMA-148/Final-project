"use client";
import axios from "axios";
import { RegisterFormSchema } from "@/lib/rules";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ دالة مرنة لإرسال الطلبات عبر Axios
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

        toast.success("تم التسجيل بنجاح! يُرجى تسجيل الدخول الآن.");
        router.push("/login");

        return { success: true };
    } catch (error) {
        return {
            errors: { general: [error.message] },
        };
    }
}


// ✅ دالة تسجيل الدخول
export const login = async (formData, router) => {
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

        router.push("/home");

        return { success: true };
    } catch (error) {
        const errorMessage =
            error.response?.data?.errors?.join(", ") ||
            error.response?.data?.title ||
            error.response?.data ||
            "فشل تسجيل الدخول. تحقق من البريد الإلكتروني أو كلمة المرور.";

        console.error("❌ Error in login:", errorMessage);

        return { errors: { general: [errorMessage] } };
    }
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
