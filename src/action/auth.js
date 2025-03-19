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

        // 🔹 التحقق من وجود رسالة خطأ داخل البيانات
        if (data.error) {
            throw new Error(data.error); // ← تأكد أن المفتاح "error" مطابق لما يرسله الـ API
        }

        // التحقق من صحة التوكن قبل تخزينه
        if (!isTokenValid(data.token)) {
            throw new Error("التوكن غير صالح.");
        }

        Cookies.set("token", data.token, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
        });

        toast.success("تم تسجيل الدخول بنجاح 👋");
        router.push("/home");

        return { success: true, token: data.token };
    } catch (error) {
        let errorMessage = "حدث خطأ غير متوقع. يُرجى المحاولة لاحقًا.";

        // 🔹 التحقق من نص رسالة الخطأ مباشرة
        if (error.message === "كلمة المرور غير صحيحة") {
            errorMessage = "كلمة المرور التي أدخلتها غير صحيحة.";
        } else if (error.message === "البريد الإلكتروني غير موجود") {
            errorMessage = "البريد الإلكتروني الذي أدخلته غير صحيح.";
        } else if (error.message === "التوكن غير صالح.") {
            errorMessage = "حدث خطأ أثناء التحقق من صلاحية الجلسة.";
        }

        toast.error(errorMessage);
        return { errors: { general: [errorMessage] } };
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
