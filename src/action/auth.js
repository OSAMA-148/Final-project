"use client";
import axios from "axios";
import { RegisterFormSchema } from "@/lib/rules";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ دالة مرنة لإرسال الطلبات عبر Axios
async function fetchData(endpoint, method, body) {
    try {
        const { data } = await axios({
            method,
            url: `${API_BASE_URL}/${endpoint}`,
            data: body,
            headers: {
                "Content-Type": "application/json",
                accept: "text/plain",
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

    try {
        await fetchData("register", "POST", validatedFields.data);

        toast.success("تم التسجيل بنجاح! يُرجى تسجيل الدخول الآن.");
        router.push("/login");

        return { success: true };
    } catch (error) {
        return { errors: { general: [error.message] } };
    }
}

export async function login(formData, router) {
    const loginData =
        formData instanceof FormData
            ? {
                  email: formData.get("email"),
                  password: formData.get("password"),
              }
            : {
                  email: formData.email,
                  password: formData.password,
              };
    if (!formData || !formData.email || !formData.password) {
        return { errors: { general: ["البيانات غير مكتملة."] } };
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        const data = await fetchData("login", "POST", loginData);

        // التحقق من صحة التوكن قبل تخزينه
        if (!isTokenValid(data.token)) {
            throw new Error("التوكن غير صالح.");
        }

        Cookies.set("token", data.token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
        });

        toast.success("logged in successfully👋");
        router.push("/home");

        return { success: true, token: data.token };
    } catch (error) {
        return { errors: { general: [error.message] } };
    }
}

function isTokenValid(token) {
    try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        return exp * 1000 > Date.now();
    } catch {
        return false;
    }
}
