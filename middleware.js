import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token");

    const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.url)); // 🔒 توجيه المستخدم إلى تسجيل الدخول
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/home", req.url)); // 🔐 منع الدخول لصفحة تسجيل الدخول إذا كان التوكين موجود
    }

    return NextResponse.next(); // ✅ السماح بالمتابعة
}
// دى الصفحات المحميه 
export const config = {
    matcher: ["/home", "/chatbot", "/common", "/info", "/report", "/upload", "/usage",],   
};
