import { supabase } from "../libs/supabaseClient";

export type DonasiType = {
  id: number;
  tittle: string;
  description: string;
  location: string;
  collected: number;
  daysLeft: number;
  image: string;
  detail: string;
  donatur: number;
  url: string;
  kategori: number;
};

export const fetchDonations = async (): Promise<DonasiType[]> => {
  let { data, error } = await supabase.from("donations").select("*");

  if (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }

  return data || [];
};

export const insertDonations = async (
  donation: DonasiType
): Promise<boolean> => {
  const { error } = await supabase.from("donations").insert(donation);

  if (error) {
    console.error(`Error inserting donation: ${error.message}`);
    return false;
  }

  console.log("Donation inserted successfully");
  return true;
};

export const fetchUrl = async (url: string): Promise<DonasiType | null> => {
  let { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("url", url)
    .single();

  if (error) {
    console.error(`Error fetching donation by URL: ${error.message}`);
    return null;
  }

  return data || null;
};

export const fetchDonationsByKategori = async (
  kategori: number
): Promise<DonasiType[] | null> => {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .eq("kategori", kategori);

  if (error) {
    console.error(`Error fetching donation by kategori: ${error.message}`);
    return null;
  }

  return data || null;
};