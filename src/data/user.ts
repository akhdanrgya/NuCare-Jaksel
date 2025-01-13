import { supabase } from "../libs/supabaseClient";

export type UserType = {
  id: string;
  username: string;
  fullname: string
  phone: string
};

export const fetchUser = async (): Promise<UserType[]> => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }

  return data || [];
};

export const fetchRecentUser = async (id: string): Promise<UserType[]> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }

  return data || [];
};

export const updateUser = async (id: string, username: string, fullname: string, phone: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ username: username, fullname: fullname, phone: phone })
    .eq("id", id);

  return { error };
};

