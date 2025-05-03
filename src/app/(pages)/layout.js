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
            <Link href="/home" className="absolute left-5 top-5 text-2xl lg:hidden ">
                <IoIosArrowBack />
            </Link>
            {/* صورة المستخدم في كل الصفحات */}
            <div className="absolute top-15 left-1.5 lg:left-3.5 lg:top-8 flex justify-center items-center">
                <Image
                    width={50}
                    height={50}
                    src={profileImage || "/defult.png"}
                    alt="Profile"
                    className="lg:w-14 lg:h-14 w-15 h-15 rounded-full border border-gray-300"
                />
                <span className="lg:block ml-2 font-bold lg:text-3xl hidden font-serif">
                    {fullName}
                </span>
            </div>
            <main className="flex justify-center items-center w-full h-full">
                {children}
            </main>
        </>
    );
}
