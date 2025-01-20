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

export const deleteDonation = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("donations").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting donation: ${error.message}`);
    return false;
  }

  console.log("Donation deleted successfully");
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
      return false;
    }

    console.log("Collected updated successfully");
    return true;
  }

  console.log("Donation not found");
  return false;
};


// export const updateCollected = async (
//     id: number,
//     value: number
// ): Promise<boolean> => {
//   const { data, error } = await supabase
//       .from("donations")
//       .select("collected")
//       .eq("id", id)
//       .single();

//   if (error) {
//     console.error(`Error fetching donation by id: ${error.message}`);
//     return false;
//   }
  
//   if (data) {
//     const newCollected = data.collected + value;

//     const { error: updateError } = await supabase
//         .from("donations")
//         .update({ collected: newCollected })
//         .eq("id", id);

//     if (updateError) {
//       console.error(`Error updating collected: ${updateError.message}`);
//       return false;
//     }

//     console.log("Collected updated successfully");
//     return true;
//   }

//   console.log("Donation not found");
//   return false;
// };


// export const updateCollected = async (id: number, collected: number) => {
//   const { data, error } = await supabase
//     .from("donations")
//     .update([
//       {
//         collected
//       }
//     ])
//     .eq("id", id)

//   if (error) {
//     console.error("Error updating collected:", error)
//     alert("Gagal memperbarui data collected")
//   } else {
//     alert("Data collected berhasil diperbarui")
//   }
// }