"use client";
import React, { useEffect, useState } from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import Table from "@/components/Table";
import { fetchDonaturZakat, DonaturZakatType } from "@/data/donaturZakat";

const columns: { accessorKey: keyof DonaturZakatType; header: string }[] = [
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

export default function ZakatPage() {
    const [data, setData] = useState<DonaturZakatType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDonaturZakat();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <section className={`${montserrat.variable} font-montserrat`}>
            {/* TOP */}
            <div className="m-10 flex justify-between">
                <SearchForm header={false} search={"Zakat"} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* List */}
                <div className=''>
                    <Table columns={columns} data={data} source='zakat' />
                </div>
                {/* Pagination */}
                <div className=''>

                </div>

            </div>
        </section>
    )
}
