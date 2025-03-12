"use client";

import { useState } from "react";

const Report = () => {
    const [text, setText] = useState("");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full mb-[195px]">
            <div className="w-[70%] flex flex-col items-center">
                {/* صندوق الإدخال بحجم أكبر */}
                <textarea
                    placeholder="Describe Your Problem"
                    className="w-full h-40 border border-gray-300 rounded-lg p-5 text-gray-700 text-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 resize-none shadow-xl transition"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* زر الإرسال */}
                <button
                    className={`mt-3 font-semibold py-3 px-20 rounded-full text-lg shadow-md transition duration-300 ${
                        text.trim()
                            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!text.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Report;
