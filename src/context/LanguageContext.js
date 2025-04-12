import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en"); // اللغة الافتراضية

    const setLanguageToEnglish = () => {
        setLanguage("en");
    };

    const setLanguageToArabic = () => {
        setLanguage("ar");
    };

    return (
        <LanguageContext.Provider
            value={{ language, setLanguageToEnglish, setLanguageToArabic }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
