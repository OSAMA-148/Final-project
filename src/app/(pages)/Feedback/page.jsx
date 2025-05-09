"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { language } = useLanguage();

    const texts = {
        en: {
            fetching: "Fetching orders...",
            error: "Failed to fetch orders. Please try again.",
        },
        ar: {
            fetching: "جارٍ جلب الطلبات...",
            error: "فشل في جلب الطلبات. حاول مرة أخرى.",
        },
    };

    const fetchOrders = async () => {
        try {
            setFetching(true);
            const token = Cookies.get("token");
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL2}/ReportProblem`;

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(res.data);
        } catch (err) {
            console.error(err.message);
            toast.error(texts[language].error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [language]);


    if (fetching)
        return <p className="text-white">{texts[language].fetching}</p>;

    return (
        <div className="p-4 lg:mb-52 mb-27">
            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:h-[35vh] h-[35vh] overflow-y-scroll scroll-smooth overflow-x-hidden">
                {orders.map((order, index) => (
                    <div
                        key={order.id || index}
                        className="bg-[#1e293b] text-white rounded-xl p-4 flex flex-col gap-3 transition duration-200 hover:scale-105 ease-in-out cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src="/defult.png"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="font-bold text-base">
                                    {order.appUser || "User"}
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    {order.email}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-300 font-bold">
                            {order.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
