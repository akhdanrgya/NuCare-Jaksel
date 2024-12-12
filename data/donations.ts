
import { supabase } from "../libs/supabaseClient";

export type DonasiType = {
  tittle: string;
  description: string;
  location: string;
  collected: number;
  daysLeft: number;
  image: string;
  detail: string;
  donatur: number;
};

export const fetchDonations = async (): Promise<DonasiType[]> => {
  let { data, error } = await supabase
  .from('donations')
  .select('*')

  if (error) {
    console.log(`Error: ${error.message}`)
    return []
  }

  // console.log(data)

  return data || []
}