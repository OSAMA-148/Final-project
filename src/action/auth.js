"use client";
import axios from "axios";
import { RegisterFormSchema } from "@/lib/rules";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ دالة مرنة لإرسال الطلبات عبر Axios
async function fetchData(endpoint, method, body, isFormData = false) {
    try {
        const { data } = await axios({
            method,
            url: `${API_BASE_URL}/${endpoint}`,
            data: body,
            headers: {
                "accept": "text/plain",
                "Content-Type": isFormData
                    ? "multipart/form-data"
                    : "application/json",
            },
        });

        if (!data || Object.keys(data).length === 0) {
            throw new Error("لم يتم استلام بيانات من السيرفر.");
        }

        return data;
    } catch (error) {
        console.error(
            `❌ Error in ${endpoint}:`,
            error.response?.data || error.message
        );

        throw new Error("حدث خطأ غير متوقع. يُرجى المحاولة لاحقًا.");
    }
}

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

    const finalFormData = new FormData();
    finalFormData.append("name", validatedFields.data.name);
    finalFormData.append("email", validatedFields.data.email);
    finalFormData.append("password", validatedFields.data.password);
    finalFormData.append(
        "confirmPassword",
        validatedFields.data.confirmPassword
    );

    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
        finalFormData.append("ProfileImage", imageFile);
    }

    try {
        await fetchData("register", "POST", finalFormData, true);

        toast.success("تم التسجيل بنجاح! يُرجى تسجيل الدخول الآن.");
        router.push("/login");

        return { success: true };
    } catch (error) {
        const errorMessage =
            error.response?.data?.errors?.join(", ") || // ← التقاط الأخطاء في شكل Array
            error.response?.data?.title ||
            error.response?.data ||
            error.message ||
            "حدث خطأ غير متوقع.";

        return {
            errors: { general: [errorMessage] },
        };
    }
}

export async function login(formData, router) {
    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    if (!loginData.email || !loginData.password) {
        return { errors: { general: ["البيانات غير مكتملة."] } };
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetchData("login", "POST", loginData);

        if (data.error) {
            throw new Error(data.error);
        }

        if (!isTokenValid(data.token)) {
            throw new Error("التوكن غير صالح.");
        }

        Cookies.set("token", data.token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
            path: "/",
            httpOnly: true, // ✅ إضافة مزيد من الأمان
        });

        toast.success("تم تسجيل الدخول بنجاح 👋");
        router.push("/home");

        return { success: true, token: data.token };
    } catch (error) {
        toast.error(error.message);
        return { errors: { general: [error.message] } };
    }
}

// ✅ تحديث دالة فحص التوكن باستخدام مكتبة JWT
function isTokenValid(token) {
    try {
        const decoded = jwt.decode(token);
        return decoded && decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

