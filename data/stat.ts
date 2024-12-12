import { supabase } from "../libs/supabaseClient";

export type StatsType = {
  value: number;
  label: string;
  icon: string;
}

export const fetchStats = async (): Promise<StatsType[]> => {
  let {data, error} = await supabase
  .from('stats')
  .select('*')

  if(error) {
    console.log(`Error: ${error.message}`)
    return []
  }

  // console.log(data)

  return data || []

}


// const stats = [
//     { value: "53.314.706", label: "Penerima Manfaat", icon: "/path/to/icon1.svg" },
//     { value: "Rp. 2.825.589.123.623,-", label: "Penghimpunan", icon: "/path/to/icon2.svg" },
//     { value: "Rp. 2.792.571.002.035,-", label: "Penyaluran", icon: "/path/to/icon3.svg" },
//     { value: "615.343", label: "Donatur", icon: "/path/to/icon4.svg" },
//   ];

// export default stats