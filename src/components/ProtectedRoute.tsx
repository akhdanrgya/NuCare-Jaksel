'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: any) => {
    const route = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            route.push('/login'); // Redirect only after the component has mounted
        }
    }, [user, route]); // Add dependencies to re-run the effect when user or router changes

    // Avoid rendering children if the user is not authenticated
    if (!user) {
        return null;
    }

    return <>{children}</>
};

export default ProtectedRoute