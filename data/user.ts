import { supabase } from "../libs/supabaseClient";

export type UserType = {
  id: string;
  username: string;
};

export const fetchUser = async (): Promise<UserType[]> => {
  let { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }

  return data || [];
};

export const fetchRecentUser = async (id: string): Promise<UserType[]> => {
  let { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }

  return data || [];
};
