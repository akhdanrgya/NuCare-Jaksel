
import { supabase } from "../libs/supabaseClient";


export type BeritaType = {
    id: number
    created_at: string
    judul: string
    kategori: string
    article: string
    author_name: string
    image: string
}

export const FetchBerita = async() => {
    const {data, error} = await supabase
    .from("berita")
    .select("*")

    if(error){
        console.log(`Error: ${error.message}`)
        return []
    }

    return data || []
}

export const FetchBeritaById = async (idx: number): Promise<BeritaType | null> => {
    let { data, error } = await supabase
        .from("berita")
        .select('*')
        .eq('id', idx)
        .single()

    if (error) {
        console.error(`Error fetching berita by id: ${error.message}`)
        return null
    }

    return data as BeritaType || null
}
