import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("fullName");
        if (storedName) {
            setFullName(storedName);
        }
    }, []);

    return (
        <UserContext.Provider value={{ fullName, setFullName }}>
            {children}
        </UserContext.Provider>
    );
};
