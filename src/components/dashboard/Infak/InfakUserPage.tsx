"use client"
import React, { useEffect, useState } from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import { fetchDonaturInfak, DonaturInfakType, fetchDonaturInfakById } from "@/data/donaturInfak";
import Table from "@/components/Table";
import { useParams } from 'next/navigation';

const columns: { accessorKey: keyof DonaturInfakType; header: string }[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Full Name" },
    { accessorKey: "email", header: "E-Mail" },
    { accessorKey: "telp", header: "Nomor Ponsel" },
    { accessorKey: "value", header: "Amount" },
];

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

export default function InfakPage() {
    const [data, setData] = React.useState<DonaturInfakType[]>([]);
    const { id } = useParams(); // Ambil parameter id dari URL
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDonatur = async () => {
            if (id) {
                setLoading(true);
                try {
                    const data = await fetchDonaturInfakById(Number(id));
                    console.log(`datanya: ${data}`)
                    setData(data);
                } catch (err) {
                    setError("Failed to load data");
                } finally {
                    setLoading(false);
                }
            }
        };

        if (id) {
            fetchDonatur();
        }
    }, [id]);


    return (
        <section className={`${montserrat.variable} font-montserrat`}>
            {/* TOP */}
            <div className="m-10 flex justify-between">
                <SearchForm header={false} search={"Infak"} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* List */}
                <div className=''>
                    <Table columns={columns} data={data} source='infak' />
                </div>
                {/* Pagination */}
                <div className=''>

                </div>

            </div>
        </section>
    )
}
