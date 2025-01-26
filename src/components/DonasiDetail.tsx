"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUrl } from "../data/donations";
import { DonasiType } from "../data/donations";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import { fetchKategoriById } from "@/data/kategori";
import DonasiPage from "./dashboard/Donasi/DonasiPage";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const DonasiDetail = () => {
    const { url } = useParams();
    const [donation, setDonation] = useState<DonasiType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [kategori, setKategori] = useState<string>("Tidak Tersedia");

    useEffect(() => {
        const getDonation = async () => {
            if (url && typeof url === "string") {
                try {
                    const donationData = await fetchUrl(url);
                    if (donationData) {
                        setDonation(donationData);

                        if (donationData.kategori) {
                            const kategoriData = await fetchKategoriById(donationData.kategori);
                            setKategori(kategoriData?.tittle || "Tidak Tersedia");
                        }
                    } else {
                        setError("Donasi tidak ditemukan");
                    }
                } catch {
                    setError("Terjadi kesalahan saat memuat data");
                }
            }
            setLoading(false);
        };

        getDonation();
    }, [url]);

    const formatRupiah = (value: number): string => {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
        }).format(value);
    };


    const handleDonasi = () => {
        if (url) {
            router.push(`/program/${url}/payment`);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <section className={`bg-white py-16 ${montserrat.variable} font-montserrat`}>
            <div
                className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-10"
            >
                {/* Image Section */}
                <div className="flex justify-center">
                    <Image
                        className="shadow-lg object-cover"
                        src={donation?.image || "/placeholder.jpg"}
                        alt={donation?.title || "Donasi"}
                        height={1920}
                        width={1080}
                    />
                </div>

                {/* Detail Section */}
                <div className="w-full md:w-2/3">
                    <h1 className="text-4xl font-semibold text-center md:text-left mb-6 text-gray-900">
                        {donation?.title || "Judul Tidak Tersedia"}
                    </h1>

                    <div className="flex justify-between mb-10">
                        <div>
                            <p>Category</p>
                            <p>{kategori}</p>
                        </div>
                        <div>
                            <p>Location</p>
                            <p>{donation?.location || "Tidak Tersedia"}</p>
                        </div>
                        <div>
                            <p>Author</p>
                            <p>{donation?.author || "Tidak Tersedia"}</p>
                        </div>
                    </div>

                    <hr className="border-gray-300 my-4" />


                    <div className="flex justify-between mb-5">
                        <div>
                            <p>Terkumpul</p>
                            <p className="text-green-500 text-2xl">
                                {donation?.collected ? `${formatRupiah(donation.collected)}` : "0"}
                            </p>
                        </div>
                        <div>
                            <p>Dana Dibutuhkan</p>
                            <p className="font-semibold text-gray-900 text-2xl">
                                {donation?.target ? `${formatRupiah(donation.target)}` : "0"}
                            </p>
                        </div>
                    </div>

                    {/* ProgressBar */}
                    <ProgressBar
                        target={donation?.target || 0}
                        collected={donation?.collected || 0}
                    />

                    <div className="mt-5 ">
                        <button
                            className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200 w-full"
                            onClick={handleDonasi}
                        >
                            Donasi Sekarang
                        </button>
                    </div>
                </div>
            </div>

            {/* Article Section */}
            <div className="max-w-7xl mx-auto py-10 px-5 md:px-10">
                <p>{donation?.detail || "Detail tidak tersedia"}</p>
            </div>

            <div className="container mx-auto px-10 mt-24">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-xl">Program Lainnya</h3>
                    <h3 className="font-semibold text-green-500 text-xl">Selanjutnya</h3>
                </div>
            </div>
            <DonasiPage detail={true} />

        </section>
    );
};

export default DonasiDetail;
