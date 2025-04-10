"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/UserContext";
import { ProfileImageProvider } from "@/context/ProfileImageContext";

const queryClient = new QueryClient();

export default function ContextProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ProfileImageProvider>{children}</ProfileImageProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
