"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import React from "react";


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
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>User ID: {session.user.id}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
