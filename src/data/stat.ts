import { supabase } from "../libs/supabaseClient";

export type StatsType = {
  value: number;
  label: string;
  icon: string;
}

export const fetchStats = async (): Promise<StatsType[]> => {
  const {data, error} = await supabase
  .from('stats')
  .select('*')

  if(error) {
    console.log(`Error: ${error.message}`)
    return []
  }

  // console.log(data)

  return data || []

}