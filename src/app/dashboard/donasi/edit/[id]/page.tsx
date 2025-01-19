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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDonasi = async () => {
            if (id) {
                setLoading(true);
                try {
                    const data = await fetchDonationById(Number(id));
                    console.log(`datanya: ${data}`)
                    setDonationData(data);
                } catch (err) {
                    setError("Failed to load data");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchDonasi();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!donationData) {
        return <p>Data not found</p>;
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Donasi" />
            <FormDonasi defaultValues={donationData} editing={true}/>
        </DefaultLayout>
    )
}

export default EditBerita;
