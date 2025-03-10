"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";

const page = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        // Logout logic here (e.g., clearing tokens, redirecting, etc.)
        console.log("Logged out");
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            {/* Header */}
            <header>
                <div className="w-full flex items-center p-4 justify-between">
                    <div
                        className="flex items-center relative left-3.5 top-0"
                        ref={menuRef}
                    >
                        <Image
                            priority={true}
                            src="/profile.png"
                            alt="Profile Picture"
                            width={50}
                            height={50}
                            className="rounded-full"
                            onClick={toggleMenu}
                        />
                        {menuVisible && (
                            <ul
                                id="menu"
                                className="absolute top-[61px] left-0 bg-white border border-gray-300 rounded-xl shadow-xl w-32 p-1 justify-center items-center space-y-1.5"
                            >
                                <li className="text-center font-bold  hover:bg-gray-100 transition ease-in-out">
                                    <span className=" font-bold">Name</span>
                                </li>

                                <li className="hover:bg-gray-100 transition ease-in-out">
                                    <Link
                                        href="/setting"
                                        className="flex justify-center"
                                    >
                                        <Image
                                            src="/setting.png"
                                            alt="Settings"
                                            width={25}
                                            height={25}
                                        />
                                        <span className="ml-4 font-bold">
                                            setting
                                        </span>
                                    </Link>
                                </li>
                                <li className="flex justify-center items-center hover:bg-gray-100 transition ease-in-out cursor-pointer">
                                    <button
                                        onClick={handleLogout}
                                        className=""
                                    ></button>
                                    <FiLogOut className="text-2xl" />
                                    <span className="ml-4 font-bold">
                                        Logout
                                    </span>
                                </li>
                            </ul>
                        )}
                    </div>
                    <Link href="/info">
                        <Image
                            src="/info.svg"
                            alt="icon"
                            width={35}
                            height={30}
                            className=""
                        />
                    </Link>
                </div>
            </header>

            <main className="pt-44">
                {/* Profile Picture and Welcome Text */}

                {/* Buttons Section */}
                <div className="flex flex-wrap justify-center gap-x-40 gap-y-10 -mt-28">
                    <Link
                        href="/upload"
                        className="bg-green-600 text-black p-4 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/uploadimage.svg"
                            alt="Upload"
                            width={35}
                            height={35}
                            priority={true}
                        />
                        <span className="mt-2 font-semibold font-serif">
                            Upload Image
                        </span>
                    </Link>

                    <Link
                        href="/common"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/common.svg"
                            alt="Diseases"
                            width={30}
                            height={30}
                            priority={true}
                        />
                        <span className="mt-2 font-semibold font-serif">
                            Common Regional Diseases
                        </span>
                    </Link>

                    <Link
                        href="/report"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/report.svg"
                            alt="Report"
                            width={30}
                            height={30}
                            priority={true}
                        />
                        <span className="mt-2 font-serif font-semibold">
                            Report a Problem
                        </span>
                    </Link>

                    <Link
                        href="/usage"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-lg hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/tips.svg"
                            alt="Tips"
                            width={30}
                            height={30}
                            priority={true}
                        />
                        <span className="mt-2 font-serif font-semibold">
                            Fertilizers Usage Tips
                        </span>
                    </Link>
                </div>
            </main>

            {/* { Footer Image */}
            <footer>
                <div className="absolute left-0 bottom-16">
                    <Link href="/chatbot">
                        <Image
                            src="/ai.svg"
                            alt="AI Elements"
                            width={70}
                            height={50}
                            priority={true}
                        />
                    </Link>
                </div>
            </footer>
        </>
    );
};

export default page;
