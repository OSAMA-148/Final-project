"use client";

import { useState } from "react";

const Report = () => {
    const [text, setText] = useState("");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full">
            <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
                {/* صندوق الإدخال بحجم أكبر */}
                <textarea
                    placeholder="Describe Your Problem"
                    className="w-full h-44 border border-gray-300 rounded-lg p-5 text-gray-700 text-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 resize-none shadow-md focus:scale-110 transition"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* زر الإرسال */}
                <button
                    className={`mt-4 font-semibold py-4 px-20 rounded-full text-lg shadow-md transition duration-300 ${
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
