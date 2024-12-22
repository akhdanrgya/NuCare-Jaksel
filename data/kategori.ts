import { supabase } from "../libs/supabaseClient";


export type KategoriType = {
    id: number
    tittle: string
}

export const fetchKategori = async (): Promise<KategoriType[]> => {
    let { data, error } = await supabase.from("kategori").select("*")

    if (error){
        console.log(`Error: ${error.message}`)
        return[]
    }

    return data || []
}