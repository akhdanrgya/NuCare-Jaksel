"use client";

import React, {useState, useEffect} from "react";
import {FetchBerita, BeritaType} from "../data/bertita";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {format} from "date-fns";

interface BeritaCardProps {
    lainnya?: boolean;
}


const BeritaCard: React.FC<BeritaCardProps> = ({lainnya = true}) => {
    const [berita, setBerita] = useState<BeritaType[]>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchBeritaData = async () => {
            const dataBeritas = await FetchBerita();
            setBerita(dataBeritas);
        };
        fetchBeritaData();
    }, []);

    const handleCardClick = (id: number) => {
        router.push(`/berita/${id}`)
    }

    const handleBeritaClick = () => {
        router.push("/berita");
    }

    return (
        <section className="py-24 bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                <h2 className="text-4xl">Berita</h2>
            </div>

            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.length > 0 ? (
                    berita.map((data, idx) => (
                        <div
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                            key={idx}
                            onClick={() => handleCardClick(data.id)}
                        >
                            <Image
                                src={data.image}
                                alt={data.judul}
                                className="w-full h-48 object-cover rounded-t-lg"
                                height={200}
                                width={300}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-black mb-2">{data.judul}</h3>
                                <p className="text-gray-700 mb-2">{format(new Date(data.created_at), "dd MMMM yyyy")}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada berita saat ini</p>
                )}
            </div>
            {lainnya ? (
                <div className="container mx-auto text-center mt-8">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                        onClick={() => handleBeritaClick()}
                    >
                        Berita Lainnya
                    </button>
                </div>

            ) : null}
        </section>
    );
};

export default BeritaCard;
