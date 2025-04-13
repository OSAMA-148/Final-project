"use client";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useProfileImage } from "@/context/ProfileImageContext";
import { useUser } from "@/context/UserContext";

export default function HomeLayout({ children }) {
    const { profileImage } = useProfileImage();
    const { fullName } = useUser();

    return (
        <>
            {/* أيقونة الرجوع */}
            <Link href="/home" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack />
            </Link>
            {/* صورة المستخدم في كل الصفحات */}
            <div className="absolute top-18 left-1.5 lg:left-3.5 lg:top-15 flex justify-center items-center">
                <Image
                    width={50}
                    height={50}
                    src={profileImage || "/defult.png"}
                    alt="Profile"
                    className="lg:w-14 lg:h-14 w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="block ml-2 font-bold text-2xl">
                    {fullName}
                </span>
            </div>
            <main className="flex justify-center items-center w-full h-full">
                {children}
            </main>
        </>
    );
}
