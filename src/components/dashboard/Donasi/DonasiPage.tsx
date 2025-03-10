"use client";

import React, {useEffect, useState} from "react";
import {
    fetchDonations,
    DonasiType,
    deleteDonation,
    fetchDonationByTitle,
    fetchDonationsByParams, fetchDonationsByKategori
} from "@/data/donations"
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import SearchForm from "@/components/dashboard/Header/SearchForm";
import {fetchKategoriById, KategoriType, fetchKategori} from "@/data/kategori";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

interface DonasiPageProps {
    dashboard?: boolean;
    detail?: boolean;
    program?: boolean;
}

const DonasiPage: React.FC<DonasiPageProps> = ({dashboard = false, detail = false, program = false}) => {
    const [donations, setDonations] = useState<DonasiType[]>([]);
    const [kategori, setKategori] = useState<Record<number, string>>({});
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const [selectedKategori, setSelectedKategori] = useState<number>(0);
    const [dataKategori, setDataKategori] = useState<KategoriType[]>([]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchDonationsData = async () => {
            const dataDonations = await fetchDonations();
            setDonations(dataDonations);
        };

        const fetchAllKategori = async () => {
            const data = await fetchKategori()
            if (data) {
                setDataKategori(data || []);
            }
        }

        fetchAllKategori()
        fetchDonationsData();
    }, []);

    const fetchDonationsDataParams = async (query: string) => {
        const dataDonations = await fetchDonationsByParams(query);
        setDonations(dataDonations);
    };

    useEffect(() => {
        const fetchKategoriData = async () => {
            const kategoriData: Record<number, string> = {};
            const kategoriPromises = donations.map(async (donasi) => {
                const dataKategori = await fetchKategoriById(donasi.kategori);
                return {id: donasi.kategori, title: dataKategori.tittle};
            });

            const results = await Promise.all(kategoriPromises);
            results.forEach(({id, title}) => {
                kategoriData[id] = title;
            });

            setKategori(kategoriData);
        };

        if (donations.length > 0) {
            fetchKategoriData();
        }
    }, [donations]);

    const handleCardClick = (url: string) => {
        const formattedurl = url
            .replace(/^#/, "")
            .replace(/\s+/g, "-")
            .toLowerCase();
        router.push(`/program/${formattedurl}`);
    };

    const handleProgramClick = () => {
        router.push("/program");
    };

    const formatRupiah = (value: number): string => {
        return new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const kategoriId = parseInt(e.target.value);
        setSelectedKategori(kategoriId);

        if (kategoriId) {
            const filteredDonations = donations.filter((donasi) => donasi.kategori === kategoriId);
            setDonations(filteredDonations);
        } else {
            const fetchDonationsData = async () => {
                const dataDonations = await fetchDonations();
                setDonations(dataDonations);
            };
            fetchDonationsData();
        }
    };


    if (!isMounted) return null;

    return (
        <section className={`${montserrat.variable} font-montserrat ${!dashboard ? "py-24" : null}`}>
            {program ? (
                <>
                    {program ? (
                        <div className="container mx-auto mb-10 flex justify-between">
                            <SearchForm header={false} search={"Donation"} onSearch={fetchDonationsDataParams}/>
                            <div className="mb-4">
                                <select
                                    id="zakatType"
                                    value={selectedKategori}
                                    onChange={handleKategoriChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                >
                                    <option value="">Semua Kategori</option>
                                    {dataKategori.map((data, id) => (
                                        <option key={id} value={data.id}>{data.tittle}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ) : null}
                </>
            ) : (
                <>
                    {detail ? null
                        : (
                            !dashboard ? (
                                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                                    <h2 className="text-4xl font-montserrat font-bold">Ayo Mulai Berdonasi!</h2>
                                </div>
                            ) : (
                                <div className="m-10 flex justify-between">
                                    <SearchForm header={false} search={"Donation"}
                                                onSearch={fetchDonationsDataParams}/>
                                    <div className="mb-4">
                                        <select
                                            id="zakatType"
                                            value={selectedKategori}
                                            onChange={handleKategoriChange}
                                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                        >
                                            <option value="">Semua Kategori</option>
                                            {dataKategori.map((data, id) => (
                                                <option key={id} value={data.id}>{data.tittle}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Link href="/dashboard/donasi/add">
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300">
                                            Add New
                                        </button>
                                    </Link>
                                </div>
                            )
                        )}
                </>
            )}
            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {donations.length > 0 ? (
                    donations.slice((detail || dashboard) ? 0 : 0, (detail || dashboard) ? donations.length : 6).map((donasi, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="absolute bg-green-500 m-4 p-1 rounded opacity-90 right-0 top-0">
                                <h1 className="font-montserrat text-white">
                                    {kategori[donasi.kategori] || "Loading..."}
                                </h1>
                            </div>

                            <div className="overflow-hidden rounded-t-lg">
                                <Image
                                    src={donasi.image}
                                    alt={donasi.title}
                                    className="w-full h-48 cursor-pointer object-cover"
                                    width={300}
                                    height={200}
                                    onClick={() => handleCardClick(donasi.url)}
                                />
                            </div>

                            <div className="p-6">
                                <h1 className="line-clamp-2 font-bold text-xl font-montserrat mb-2 min-h-[calc(1.75rem*2)]">{donasi.title}</h1>
                                <p className="text-gray-600 text-sm mb-20 font-montserrat">
                                    {donasi.location.toUpperCase()}
                                </p>

                                <ProgressBar target={donasi.target} collected={donasi.collected}/>

                                <div className="flex justify-between font-montserrat">
                                    <p className="text-gray-600">Terkumpul</p>
                                    <p className="text-green-500 font-montserrat">{formatRupiah(donasi.collected)}</p>
                                </div>
                            </div>
                            {dashboard ? (
                                <div className="flex justify-between px-10 py-5">
                                    <Link href={`/dashboard/donasi/edit/${donasi.id}`}>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300 font-montserrat">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300 font-montserrat"
                                        onClick={() => deleteDonation(donasi.id, donasi.image)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div className="justify-center items-center">
                        <p className="text-center w-full py-6 font-montserrat">Tidak ada donasi saat ini</p>
                    </div>
                )}
            </div>
            {detail ? null : (
                !dashboard ? (
                    <div className="container mx-auto text-center mt-8">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded font-montserrat"
                            onClick={() => handleProgramClick()}
                        >
                            Program Lainnya
                        </button>
                    </div>
                ) : null
            )}
        </section>
    );
};

export default DonasiPage;
