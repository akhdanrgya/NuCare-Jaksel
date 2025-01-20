
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

export const FetchBerita = async () => {
    const { data, error } = await supabase
        .from("berita")
        .select("*")

    if (error) {
        console.log(`Error: ${error.message}`)
        return []
    }

    return data || []
}

export const FetchBeritaById = async (idx: number): Promise<BeritaType | null> => {
    const { data, error } = await supabase
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

export const insertBerita = async (judul: string, article: string, author_name: string | undefined, uploadedImageUrl: string | null) => {
    const { data, error } = await supabase
        .from("berita")
        .insert([
            {
                judul,
                article,
                author_name,
                image: uploadedImageUrl, // Sesuaikan dengan field `image` di database
            }
        ])

    if (error) {
        console.error("Error adding berita:", error.message)
        alert("Gagal menyimpan data berita")
        return null
    }

    alert("Data berita berhasil disimpan")
    return data
}

const updateBerita = async (id: number, judul: string, article: string, author_name: string, uploadedImageUrl: string | null) => {
    const { data, error } = await supabase
        .from("berita")
        .update([
            {
                judul,
                article,
                author_name,
                image: uploadedImageUrl
            }
        ])
        .eq("id", id)

    if (error) {
        console.error("Error updating berita:", error)
        alert("Gagal memperbarui data berita")
    } else {
        alert("Data berita berhasil diperbarui")
    }
}
