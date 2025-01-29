"use client"
import React, { useEffect } from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import { fetchDonaturInfak, DonaturInfakType } from "@/data/donaturInfak";
import Table from "@/components/Table";
import { fetchInfak, InfakType } from '@/data/infak';

const columns: { accessorKey: keyof InfakType; header: string }[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "amount", header: "Amount" },
];

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

export default function InfakPage() {
    const [data, setData] = React.useState<InfakType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchInfak()
            setData(result)
        }

        fetchData()

    }, [])


    return (
        <section className={`${montserrat.variable} font-montserrat`}>
            {/* TOP */}
            <div className="m-10 flex justify-between">
                <SearchForm header={false} search={"Infak"} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* List */}
                <div className=''>
                    <Table columns={columns} data={data} source="infak" />
                </div>
                {/* Pagination */}
                <div className=''>

                </div>

            </div>
        </section>
    )
}
