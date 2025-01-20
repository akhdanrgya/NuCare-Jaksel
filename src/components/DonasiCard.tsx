"use client";

import {useEffect, useState} from "react";
import {fetchDonations, insertDonations, DonasiType} from "../data/donations";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Montserrat} from "next/font/google";
import ProgressBar from "@/components/ProgressBar";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"], // Pilih weight sesuai kebutuhan
    variable: "--font-montserrat", // Custom CSS variable
});

interface DonasiCardsProps {
    lainnya?: boolean;
}

const DonasiCards: React.FC<DonasiCardsProps> = ({lainnya = true}) => {
    const [donations, setDonations] = useState<DonasiType[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchDonationsData = async () => {
            const dataDonations = await fetchDonations();
            setDonations(dataDonations);
        };
        fetchDonationsData();
    }, []);

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

    if (!isMounted) return null;

    return (
        <section className={`${montserrat.variable} font-montserrat py-24 bg-gray-100`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
                <h2 className="text-4xl font-montserrat">Ayo Mulai Berdonasi!</h2>
            </div>
            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {donations.length > 0 ? (
                    donations.map((donasi, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
                            onClick={() => handleCardClick(donasi.url)}
                        >
                            <Image
                                src={donasi.image}
                                alt={donasi.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                                width={300}
                                height={200}
                            />
                            <div className="p-6">
                                <h3 className="font-bold text-xl font-montserrat">
                                    {donasi.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-20 font-montserrat">
                                    {donasi.location.toUpperCase()}
                                </p>

                                <ProgressBar target={donasi.target} collected={donasi.collected} />

                                <div className="flex justify-between font-montserrat">
                                    <p className="text-gray-500">
                                        Terkumpul
                                    </p>
                                    <p className="text-green-500 font-montserrat">
                                        {donasi.collected}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="justify-center items-center">
                        <p className="text-center w-full py-6 font-montserrat">
                            Tidak ada donasi saat ini
                        </p>
                    </div>
                )}
            </div>
            {lainnya ? (
                <div className="container mx-auto text-center mt-8">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded font-montserrat"
                        onClick={() => handleProgramClick()}
                    >
                        Program Lainnya
                    </button>
                </div>
            ) : null}
        </section>
    );
};

export default DonasiCards;
