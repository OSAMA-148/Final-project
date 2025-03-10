import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token");
    // لو مفيش توكين بيروح على صفحه login
    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // لو اليوزر معاه توكين هيكمل
    return NextResponse.next();
}

// دى الصفحات المحميه 
export const config = {
    matcher: ["/home", "/chatbot", "/common", "/info", "/report", "/upload", "/usage",],   
};
