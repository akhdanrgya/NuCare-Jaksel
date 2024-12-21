"use client";
import React, { useState, useEffect } from "react";
import InputGroup from "../../FormElements/InputGroup";
import { supabase } from "../../../libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { updateUsername } from "../../../data/user";

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

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

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (session?.user?.id) {
      await updateUsername(session.user.id, username);
    } else {
      console.error("User ID is missing");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-semibold text-dark dark:text-white">
          Edit Profile
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Email
          </label>
          <input
            type="text"
            placeholder={session?.user.email}
            disabled
            className="mb-4.5 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
          />

          <InputGroup
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
            customClasses="mb-4.5"
          />
          <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
