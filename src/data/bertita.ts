
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
        return { data, error }
    }

    alert("Data berita berhasil disimpan")
    return { data, error }
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

export const deleteBerita = async (id: number, url: string) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus berita ini?");
    if (!confirmDelete) return;

    const fileName = url.split("/").pop();

    if (!fileName) {
        alert("URL file tidak valid!");
        return;
    }

    const { error: deleteError } = await supabase.from("berita").delete().eq("id", id);
    const { error: storageError } = await supabase.storage.from("beritaimage").remove([`beritaprivateimg/${fileName}`]);

    if (deleteError || storageError) {
        alert("Berita gagal dihapus!");
    } else {
        alert("Berita berhasil dihapus!");
    }
}
