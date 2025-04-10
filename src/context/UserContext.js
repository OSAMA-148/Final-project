import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const fetchUserName = async () => {
    const token = Cookies.get("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get(
        "https://planetdesease.runasp.net/api/Account/Profile",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.name; // أو response.data.userName حسب الـ API
};

export const UserProvider = ({ children }) => {
    const {
        data: fullName,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["userName"],
        queryFn: fetchUserName,
        staleTime: 1000 * 10, // البيانات تظل صالحة لمدة 10 ثوانٍ فقط
        cacheTime: 1000 * 60 * 10,
    });

    return (
        <UserContext.Provider value={{ fullName, isLoading, isError }}>
            {children}
        </UserContext.Provider>
    );
};
