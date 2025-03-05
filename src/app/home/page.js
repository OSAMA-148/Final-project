import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";

const page = () => {
    return (
        <>
            {/* Header */}
            <header>
                <div className="w-full flex items-center p-4 justify-between">
                    <Link href="/setting">
                        <Image
                            src="/setting.png"
                            alt="Settings"
                            width={30}
                            height={30}
                        />
                    </Link>
                    <Link href="/info">
                        <Image
                            src="/info.svg"
                            alt="icon"
                            width={30}
                            height={30}
                            className=""
                        />
                    </Link>
                </div>
            </header>

            <main className="pt-44">
                {/* Profile Picture and Welcome Text */}
                <div className="flex items-center relative left-3.5 bottom-20">
                    <Image
                        src="/profile.png"
                        alt="Profile Picture"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <p className="text-lg font-bold ml-2">
                        Welcome <span className="font-normal ml-2">(Name)</span>
                    </p>
                </div>
                {/* Buttons Section */}
                <div className="flex flex-wrap justify-center gap-8">
                    <Link
                        href="/upload"
                        className="bg-green-600 text-black p-4 rounded-lg flex flex-col items-center justify-center w-md hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/uploadimage.svg"
                            alt="Upload"
                            width={30}
                            height={30}
                        />
                        <span className="mt-2 font-semibold font-serif">
                            Upload Image
                        </span>
                    </Link>

                    <Link
                        href="/common"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-md hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/common.svg"
                            alt="Diseases"
                            width={30}
                            height={30}
                        />
                        <span className="mt-2 font-semibold font-serif">
                            Common Regional Diseases
                        </span>
                    </Link>

                    <Link
                        href="/report"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-md hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/report.svg"
                            alt="Report"
                            width={30}
                            height={30}
                        />
                        <span className="mt-2 font-serif font-semibold">
                            Report a Problem
                        </span>
                    </Link>

                    <Link
                        href="/usage"
                        className="bg-green-600 text-black p-6 rounded-lg flex flex-col items-center justify-center w-md hover:bg-green-500 transition duration-300 ease-in-out"
                    >
                        <Image
                            src="/tips.svg"
                            alt="Tips"
                            width={30}
                            height={30}
                        />
                        <span className="mt-2 font-serif font-semibold">
                            Fertilizers Usage Tips
                        </span>
                    </Link>
                </div>
            </main>

            {/* { Footer Image */}
            <footer>
                <div className="absolute left-0 lg::bottom-6">
                    <Link href="/chatbot">
                        <Image
                            src="/ai.svg"
                            alt="AI Elements"
                            width={70}
                            height={50}
                        />
                    </Link>
                </div>
            </footer>
        </>
    );
};

export default page;
