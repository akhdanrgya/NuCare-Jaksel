import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormBerita from "@/components/dashboard/Berita/FormBerita";
import { FetchBeritaById, BeritaType } from "@/data/bertita";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const EditBerita = () => {
    const router = useRouter();
    const { id } = router.query; // Ambil parameter id dari URL
    const [beritaData, setBeritaData] = useState<BeritaType | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            if (id) {
                const data = await FetchBeritaById(Number(id)); // Ambil data berita berdasarkan id
                setBeritaData(data);
            }
        };
        fetchBerita();
    }, [id]);

    if (!beritaData) {
        return <p>Loading...</p>; // Tampilkan loading saat data belum ada
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Berita" />
            <FormBerita defaultValues={beritaData} />
        </DefaultLayout>
    );
};

export default EditBerita;
