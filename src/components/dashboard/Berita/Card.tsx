"use client"
import React, { useState, useEffect } from "react";
import { FetchBerita, BeritaType } from "@/data/bertita";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import {supabase} from "@/libs/supabaseClient";

const Card = () => {
    const [berita, setBerita] = useState<BeritaType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchBeritaData = async () => {
            const dataBeritas = await FetchBerita();
            setBerita(dataBeritas);
        };
        fetchBeritaData();
    }, []);

    const handleCardClick = (id: number) => {
        router.push(`/berita/${id}`);
    };

    const handleEdit = (id: number) => {
        router.push(`/berita/edit/${id}`);
    };

    const handleDelete = async(id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
            const {data, error} = await supabase.from("berita").delete().eq("id", id)
            if(error) {
                alert("Berita gagal dihapus!");
            } else {
                alert("Berita berhasil dihapus!");
            }
        }
    };

    return (
        <section className="py-24 bg-gray-100">
            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.length > 0 ? (
                    berita.map((data, idx) => (
                        <div
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                            key={idx}
                        >
                            <img
                                src={data.image}
                                alt={data.judul}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h3
                                    className="text-lg font-semibold text-black mb-2"
                                    onClick={() => handleCardClick(data.id)}
                                >
                                    {data.judul}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {format(new Date(data.created_at), "dd MMMM yyyy", { locale: idLocale })}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        onClick={() => handleEdit(data.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada berita saat ini</p>
                )}
            </div>
        </section>
    );
};

export default Card;
