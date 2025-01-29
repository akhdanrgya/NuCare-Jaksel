import {supabase} from "@/libs/supabaseClient";

export type KategoriBeritaType = {
    id: number;
    title: string;
}

export const fetchKategoriBerita = async (): Promise<KategoriBeritaType[]> => {
    const {data, error} = await supabase
        .from("kategori_berita")
        .select("*")

    if (error) {
        console.log(`Error fetching kategori berita`, error.message)
        return []
    }

    return data || []
}

export const fetchKategoriBeritaById = async (id: number) => {
    const { data, error } = await supabase
        .from("kategori_berita")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(`Error: ${error.message}`);
        return null;
    }

    return data || null;
};

