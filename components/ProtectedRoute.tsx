'use client'
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/Auth";

const ProtectedRoute = ({ children }: any) => {
    const route = useRouter()
    const { user } = useAuth()

    if (!user) {
        route.push('/login')
    }
    return <>{children}</>
};

export default ProtectedRoute