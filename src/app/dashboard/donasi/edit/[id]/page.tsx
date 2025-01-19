"use client"

import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DonasiType, fetchDonationById } from "@/data/donations";
import FormDonasi from "@/components/dashboard/Donasi/FormDonasi";

const EditBerita = () => {
    const { id } = useParams(); // Ambil parameter id dari URL
    const [donationData, setDonationData] = useState<DonasiType | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Untuk menangani status loading
    const [error, setError] = useState<string | null>(null); // Untuk menangani error

    useEffect(() => {
        const fetchDonasi = async () => {
            if (id) {
                setLoading(true); // Mulai loading data
                try {
                    const data = await fetchDonationById(Number(id)); // Ambil data berita berdasarkan id
                    console.log(`datanya: ${data}`)
                    setDonationData(data);
                } catch (err) {
                    setError("Failed to load data"); // Set error jika fetch gagal
                } finally {
                    setLoading(false); // Selesai loading
                }
            }
        };

        // Hanya panggil fetchBerita jika id sudah ada
        if (id) {
            fetchDonasi();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading saat data sedang diambil
    }

    if (error) {
        return <p>{error}</p>; // Tampilkan error jika terjadi masalah
    }

    if (!donationData) {
        return <p>Data not found</p>; // Tampilkan pesan jika data tidak ditemukan
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Donasi" />
            <FormDonasi defaultValues={donationData} />
        </DefaultLayout>
    )
}

export default EditBerita;
