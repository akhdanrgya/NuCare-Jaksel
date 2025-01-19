import { supabase } from "../libs/supabaseClient";


export type KategoriType = {
    id: number
    tittle: string
}

export const fetchKategori = async (): Promise<KategoriType[]> => {
    const { data, error } = await supabase.from("kategori").select("*")

    if (error){
        console.log(`Error: ${error.message}`)
        return[]
    }

    return data || []
}

export const fetchKategoriById = async (id: number) => {
    const { data, error } = await supabase
        .from("kategori")
        .select("tittle")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error: ${error.message}`);
        return null;
    }

    return data?.tittle || null;
};