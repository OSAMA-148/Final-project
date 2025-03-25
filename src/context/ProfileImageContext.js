import { createContext, useContext, useState, useEffect } from "react";

const ProfileImageContext = createContext();

export const useProfileImage = () => useContext(ProfileImageContext);

export const ProfileImageProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState("/defult.png");

    useEffect(() => {
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    const updateProfileImage = (newImage) => {
        setProfileImage(newImage);
        localStorage.setItem("profileImage", newImage);
    };

    return (
        <ProfileImageContext.Provider
            value={{ profileImage, updateProfileImage }}
        >
            {children}
        </ProfileImageContext.Provider>
    );
};
