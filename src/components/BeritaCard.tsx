"use client";

import React, {useState, useEffect} from "react";
import {FetchBerita, BeritaType, deleteBerita} from "../data/bertita";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {format} from "date-fns";
import {Montserrat} from "next/font/google";
import Link from "next/link";
import SearchForm from "@/components/dashboard/Header/SearchForm";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

interface BeritaCardProps {
    dashboard?: boolean;
    detail?: boolean;
}


const BeritaCard: React.FC<BeritaCardProps> = ({dashboard = false, detail = false}) => {
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
        <section className={`${montserrat.variable} font-montserrat ${!dashboard ? "py-24" : null}`}>
            {detail ? null : (
                !dashboard ? (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                        <h2 className="text-4xl">Berita</h2>
                    </div>
                ) : (
                    <div className="m-10 flex justify-between">
                        <SearchForm header={false} search={"Donation"}/>
                        <Link href="/dashboard/berita/add">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300">
                                Add New
                            </button>
                        </Link>
                    </div>
                )
            )}

            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.length > 0 ? (
                    berita.map((data, idx) => (
                        <div
                            className="bg-white rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg"
                            key={idx}
                        >
                            <Image
                                src={data.image}
                                alt={data.judul}
                                className="w-full h-48 object-cover cursor-pointer"
                                height={200}
                                width={300}
                                onClick={() => handleCardClick(data.id)}
                            />
                            <div className="p-4 py-10">
                                <h3 className="text-lg font-bold font-montserrat text-black mb-2">{data.judul}</h3>
                                <div className="flex justify-between">
                                    <p className="text-gray-700 mb-2">{format(new Date(data.created_at), "dd MMMM yyyy")}</p>
                                    <p className="text-green-500">Berita Internasional</p>
                                </div>
                            </div>
                            {dashboard ? (
                                <div className="flex justify-between px-10 py-5">
                                    <Link href={`/dashboard/donasi/edit/${data.id}`}>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300 font-montserrat">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300 font-montserrat"
                                        onClick={() => deleteBerita(data.id, data.image)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : (null)}

                        </div>
                    ))
                ) : (
                    <p>Tidak ada berita saat ini</p>
                )}
            </div>
            {detail ? null : (
                !dashboard ? (
                    <div className="container mx-auto text-center mt-8">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
                            onClick={() => handleBeritaClick()}
                        >
                            Berita Lainnya
                        </button>
                    </div>
                ) : null
            )}

        </section>
    );
};

export default BeritaCard;
