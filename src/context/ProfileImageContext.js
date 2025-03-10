"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProfileImageContext = createContext();

export function ProfileImageProvider({ children }) {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const updateProfileImage = (imageData) => {
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
    };

    return (
        <ProfileImageContext.Provider
            value={{ profileImage, updateProfileImage }}
        >
            {children}
        </ProfileImageContext.Provider>
    );
}

export function useProfileImage() {
    return useContext(ProfileImageContext);
}
