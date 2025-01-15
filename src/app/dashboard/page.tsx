"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Dashboard from "@/components/dashboard";

const DashboardPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        console.log("Fetched session:", data.session);
        setSession(data.session);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (!session) return null

  return (
    <DefaultLayout>
      <Dashboard/>
    </DefaultLayout>
  );
};

export default DashboardPage;
