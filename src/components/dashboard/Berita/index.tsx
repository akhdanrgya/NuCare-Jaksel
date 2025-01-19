"use client";

import React, { useState, useEffect } from "react";
import { FetchBerita, BeritaType } from "@/data/bertita";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { supabase } from "@/libs/supabaseClient";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Form from "@/components/dashboard/Berita/FormBerita";

const Berita = () => {
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

    const handleDelete = async (id: number, url: string) => {
        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus berita ini?");
        if (!confirmDelete) return;

        try {
            const fileName = url.split("/").pop();

            if (!fileName) {
                alert("URL file tidak valid!");
                return;
            }

            const { error: deleteError } = await supabase.from("berita").delete().eq("id", id);
            const { error: storageError } = await supabase.storage.from("beritaimage").remove([fileName]);

            if (deleteError || storageError) {
                alert("Berita gagal dihapus!");
            } else {
                alert("Berita berhasil dihapus!");
                setBerita((prev) => prev.filter((item) => item.id !== id));
            }

        } catch (error) {
            console.error("Error deleting berita:", error);
            alert("Terjadi kesalahan saat menghapus berita.");
        }
    };


    return (
        <section className="py-24 bg-gray-100">
            <div className="">
                <h1>List Berita</h1>
                <div className="">
                    <Popover key="blur" showArrow={false}>
                        <PopoverTrigger>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Tambah Berita
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] p-6 bg-white rounded-md shadow-lg">
                            <Form />
                        </PopoverContent>
                    </Popover>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" >
                        Delete
                    </button>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {berita.length > 0 ? (
                    berita.map((data) => (
                        <div
                            key={data.id}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg"
                        >
                            <Image
                                src={data.image}
                                alt={data.judul}
                                className="w-full h-48 object-cover rounded-t-lg"
                                height={200}
                                width={300}
                            />
                            <div className="p-4">
                                <h3
                                    className="text-lg font-semibold text-black mb-2 cursor-pointer"
                                    onClick={() => handleCardClick(data.id)}
                                >
                                    {data.judul}
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    {format(new Date(data.created_at), "dd MMMM yyyy")}
                                </p>
                                <div className="flex justify-between">
                                    <Popover backdrop="blur" offset={10} placement="bottom">
                                        <PopoverTrigger>
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[240px]">
                                            <Form />
                                        </PopoverContent>
                                    </Popover>

                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(data.id, data.image)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700">Tidak ada berita saat ini</p>
                )}
            </div>
        </section>
    );
};

export default Berita;
