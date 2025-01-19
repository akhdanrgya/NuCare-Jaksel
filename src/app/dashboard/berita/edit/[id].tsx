import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormBerita from "@/components/dashboard/Berita/FormBerita";
import { FetchBeritaById, BeritaType } from "@/data/bertita";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditBerita = () => {
    const router = useRouter();
    const { id } = router.query; // Ambil parameter id dari URL
    const [beritaData, setBeritaData] = useState<BeritaType | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Untuk menangani status loading
    const [error, setError] = useState<string | null>(null); // Untuk menangani error

    useEffect(() => {
        const fetchBerita = async () => {
            if (id) {
                setLoading(true); // Mulai loading data
                try {
                    const data = await FetchBeritaById(Number(id)); // Ambil data berita berdasarkan id
                    setBeritaData(data);
                } catch (err) {
                    setError("Failed to load data"); // Set error jika fetch gagal
                } finally {
                    setLoading(false); // Selesai loading
                }
            }
        };

        // Hanya panggil fetchBerita jika id sudah ada
        if (id) {
            fetchBerita();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading saat data sedang diambil
    }

    if (error) {
        return <p>{error}</p>; // Tampilkan error jika terjadi masalah
    }

    if (!beritaData) {
        return <p>Data not found</p>; // Tampilkan pesan jika data tidak ditemukan
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Berita" />
            <FormBerita defaultValues={beritaData} />
        </DefaultLayout>
    )
}

export default EditBerita;
