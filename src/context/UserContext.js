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

    return response.data.name;
};

export const UserProvider = ({ children }) => {
    const {
        data: fullName,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["userName"],
        queryFn: fetchUserName,
    });

    return (
        <UserContext.Provider value={{ fullName, isLoading, isError }}>
            {children}
        </UserContext.Provider>
    );
};
