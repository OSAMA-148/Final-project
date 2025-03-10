"use client";

import { UserProvider } from "@/context/UserContext";
import { ProfileImageProvider } from "@/context/ProfileImageContext";

export default function ContextProviders({ children }) {
    return (
        <UserProvider>
            <ProfileImageProvider>{children}</ProfileImageProvider>
        </UserProvider>
    );
}
