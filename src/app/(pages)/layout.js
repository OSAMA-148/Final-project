"use client";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomeLayout({ children }) {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);
    return (
        <>
            {/* أيقونة الرجوع */}
            <Link href="/home" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack />
            </Link>
            {/* صورة المستخدم في كل الصفحات */}
            <div className="absolute left-3.5 top-22  flex justify-center items-center">
                <Image
                    width={40}
                    height={40}
                    src={profileImage || "/defult.png"}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border border-gray-300"
                />
                <span className="block ml-2 font-bold text-2xl">Name</span>
            </div>
            <main className="flex justify-center items-center w-full h-full">
                {children}
            </main>
        </>
    );
}
