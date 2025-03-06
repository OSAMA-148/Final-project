import { RegisterFormSchema } from "@/lib/rules";


export async function register(state, formData) {
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

    // إرسال بيانات التسجيل إلى الـ API
    const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(validatedFields.data),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        const errorData = await response.json();
        return {
            errors: errorData.errors || { general: ["Registration failed."] },
        };
    }

    // ✅ بعد نجاح التسجيل، نجرب تسجيل الدخول تلقائيًا بنفس البيانات
    return await login(null, formData);
}

export async function login(state, formData) {
    const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
        }),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { errors: errorData.errors || { general: ["Login failed."] } };
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // ✅ حفظ التوكن بعد تسجيل الدخول

    return { success: true, token: data.token };
}

