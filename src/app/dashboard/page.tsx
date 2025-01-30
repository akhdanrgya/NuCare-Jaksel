"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Alert from "../../components/Alert";

const DashboardPage = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isAlertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
                setAlertMessage("Error fetching session");
                setAlertVisible(true);
            } else {
                console.log("Fetched session:", data.session);
                setSession(data.session);
            }
            setLoading(false);
        };

        fetchSession();
    }, []);

    if (!session) return null;

    return (
        <DefaultLayout>
            <div>
                <button onClick={() => {
                    setAlertMessage("This is a manual alert message!");
                    setAlertVisible(true);
                }} className="bg-blue-500 text-white p-2 rounded">
                    Show Alert
                </button>
                <Alert
                    message={alertMessage || ""}
                    isVisible={isAlertVisible}
                    onClose={() => {
                        setAlertVisible(false);
                        setAlertMessage(null);
                    }}
                />
            </div>
        </DefaultLayout>
    );
};

export default DashboardPage;