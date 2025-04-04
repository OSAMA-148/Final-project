"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const API_BASE_URL2 = process.env.NEXT_PUBLIC_API_BASE_URL2;
const Report = () => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!text.trim()) return;

        setLoading(true);

        try {
            const token = Cookies.get("token");
            await axios.post(
                `${API_BASE_URL2}/ReportProblem`,
                { descripcion: text },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        "Accept": "*/*",
                    },
                }
            );

            toast.success("Report sent successfully!");
            setText("");
        } catch (error) {
            toast.error("Failed to send the report. Please try again.");
            console.error("❌ Error while sending the report:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 w-full mb-[195px]">
            <div className="w-[70%] flex flex-col items-center">
                <textarea
                    placeholder="Describe Your Problem"
                    className="w-full h-40 border border-gray-300 rounded-lg p-5 text-gray-700 text-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 resize-none shadow-xl transition"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className={`mt-3 font-semibold py-3 px-20 rounded-full text-lg shadow-md transition duration-300 ${
                        text.trim() && !loading
                            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!text.trim() || loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default Report;
