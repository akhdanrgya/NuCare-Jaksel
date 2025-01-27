"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FetchBeritaById, BeritaType } from "../data/bertita";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { format } from "date-fns";
import BeritaPage from "./dashboard/Berita";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const BeritaDetails = () => {
    const { idx } = useParams();

    const [berita, setBerita] = useState<BeritaType | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getBerita = async () => {
            const id = Number(idx);
            if (!isNaN(id)) {
                try {
                    const beritaData = await FetchBeritaById(id);
                    if (beritaData) {
                        setBerita(beritaData);
                    } else {
                        setError("Berita Tidak ditemukan");
                    }
                } catch (err) {
                    setError("Terjadi kesalahan saat mengambil data");
                }
            } else {
                setError("ID tidak valid");
            }
        };

        getBerita();
    }, [idx]);

    return (
        <section className={`${montserrat.variable} font-montserrat py-24`}>
            {error ? (
                <p>{error}</p>
            ) : berita ? (
                <>
                    <div className="container mx-auto px-20">
                        {/* Gambar Berita */}
                        <div className="flex justify-center items-center">
                            <Image src={berita.image} alt={berita.judul} width={1080} height={1920} />
                        </div>

                        {/* Informasi Berita */}
                        <div className="mt-20">
                            <h1 className="font-bold text-4xl">{berita.judul}</h1>
                            <div className="flex gap-8 my-2">
                                <p className="flex gap-1">
                                    By <span className="font-semibold text-gray-700">{berita.author_name}</span>
                                </p>
                                <div className="w-px bg-gray-300"></div>
                                <p>{format(new Date(berita.created_at), "dd MMMM yyyy")}</p>
                            </div>
                        </div>

                        <hr className="border-gray-300 my-4 mb-10" />


                        {/* Artikel */}
                        <div>
                            <p>{berita.article}</p>
                        </div>
                    </div>

                    {/* Berita Lainnya */}
                    <div className="container mx-auto px-10 mt-24">
                        <div className="flex justify-between">
                            <h3 className="font-semibold text-xl">Berita Lainnya</h3>
                            <h3 className="font-semibold text-green-500 text-xl">Selanjutnya</h3>
                        </div>
                    </div>
                    <BeritaPage detail={true} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </section>

    );
};

export default BeritaDetails;
