import { supabase } from "../libs/supabaseClient";

export type DonasiType = {
  id: number;
  title: string;
  description: string;
  location: string;
  collected: number;
  daysLeft: string;
  image: string;
  detail: string;
  donatur: number;
  url: string;
  kategori: number;
  target: number;
  author: string;
};

export const fetchDonations = async (): Promise<DonasiType[]> => {
  const { data, error } = await supabase.from("donations").select("*");

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
  const { data, error } = await supabase
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

export const fetchDonationById = async (id: number): Promise<DonasiType | null> => {
  const { data, error } = await supabase
    .from("donations")
    .select('*')
    .eq('id', id)
    .single()



  if (error) {
    console.error(`Error fetching berita by id: ${error.message}`)
    return null
  }

  return data as DonasiType || null
};

export const fetchDonationByTitle = async (title: string): Promise<string[] | null> => {
  const { data, error } = await supabase
    .from("donations")
    .select('title')
    
    console.table(data)

  if (error) {
    console.error(`Error fetching berita by id: ${error.message}`)
    return null
  }

  // Pastikan data ada dan kembalikan hanya field 'title' dalam bentuk array
  return data ? data.map((donation) => donation.title) : null;
};

export const deleteDonation = async (id: number, url: string): Promise<boolean> => {
  const fileName = url.split("/").pop();
  const { error: donationError } = await supabase.from("donations").delete().eq("id", id);
  const { error: storageError } = await supabase.storage.from("donationimage").remove([`donasiprivateimg/${fileName}`]);

  if (donationError || storageError) {
    alert(`Error deleting donation`);
    return false;
  }

  alert("Donation deleted successfully");
  return true;
};

export const updateCollected = async (
    id: number,
    value: number
): Promise<boolean> => {
  const { data, error } = await supabase
      .from("donations")
      .select("collected")
      .eq("id", id)
      .single();

  if (error) {
    console.error(`Error fetching donation by id: ${error.message}`);
    return false;
  }
  
  if (data) {
    const newCollected = data.collected + value;

    const { error: updateError } = await supabase
        .from("donations")
        .update({ collected: newCollected })
        .eq("id", id);

    if (updateError) {
      console.error(`Error updating collected: ${updateError.message}`);
      alert("Gagal memperbarui data collected")
      return false;
    }

    console.log("Collected updated successfully");
    alert("Berhasil Collected")
    return true;
  }

  console.log("Donation not found");
  return false;
};
