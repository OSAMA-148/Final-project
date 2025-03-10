"use client";
import axios from "axios";
import { RegisterFormSchema } from "@/lib/rules";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const API_BASE_URL = "http://authenticationd.runasp.net/api/account";

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

        const errorMessage =
            error.response?.data?.errors?.general?.[0] ||
            error.response?.data?.errors?.[0] ||
            "حدث خطأ أثناء المعالجة.";
        throw new Error(errorMessage);
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
export async function login(state, formData, router) {
    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const data = await fetchData("login", "POST", loginData);

        //  حفظ التوكن في الـ Cookies
        Cookies.set("token", data.token, { expires: 1, secure: true });

        toast.success("تم تسجيل الدخول بنجاح! مرحبًا بك 👋");
        router.push("/home");

        return { success: true, token: data.token };
    } catch (error) {
        return { errors: { general: [error.message] } };
    }
}
