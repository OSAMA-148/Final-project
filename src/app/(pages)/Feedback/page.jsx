"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";

const Page = () => {
    const [orders, setOrders] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { language } = useLanguage();

    const texts = {
        en: {
            fetching: "Fetching orders...",
            error: "Failed to fetch orders. Please try again.",
            edit: "Edit",
            delete: "Delete",
            save: "Save",
            cancel: "Cancel",
            deleteSuccess: "Order deleted successfully!",
            deleteError: "Failed to delete order.",
            updateSuccess: "Order updated successfully!",
            updateError: "Failed to update order.",
            search: "Search...",
        },
        ar: {
            fetching: "جارٍ جلب الطلبات...",
            error: "فشل في جلب الطلبات. حاول مرة أخرى.",
            edit: "تعديل",
            delete: "حذف",
            save: "حفظ",
            cancel: "إلغاء",
            deleteSuccess: "تم حذف الطلب بنجاح!",
            deleteError: "فشل في حذف الطلب.",
            updateSuccess: "تم تحديث الطلب بنجاح!",
            updateError: "فشل في تحديث الطلب.",
            search: "ابحث...",
        },
    };

    const fetchOrders = async (query = "") => {
        try {
            setFetching(true);
            const token = Cookies.get("token");
            const url = query
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL2}/ReportProblem/Search?query=${query}`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL2}/ReportProblem`;

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







    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchOrders(value);
    };

    if (fetching)
        return <p className="text-white">{texts[language].fetching}</p>;

    return (
        <div className="p-4 lg:mb-52 mb-28">
            

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:h-[34vh] h-[34vh] overflow-y-scroll scroll-smooth">
                {orders.map((order, index) => (
                    <div
                        key={order.id || index}
                        className="bg-[#1e293b] text-white rounded-xl shadow-lg p-4 flex flex-col gap-3 transition hover:shadow-xl"
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src="/defult.png"
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="font-semibold text-base">
                                    {order.appUser || "User"}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {order.email}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 font-bold">
                            {order.description}
                        </p>

                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
