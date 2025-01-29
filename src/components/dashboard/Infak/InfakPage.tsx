"use client";
import React, { useEffect } from 'react';
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import { fetchInfak, InfakType } from '@/data/infak';
import Table from "@/components/Table";

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
            try {
                const result = await fetchInfak();
                setData(result);
            } catch (error) {
                console.error("Error fetching infak data:", error);
            }
        };

        fetchData();
    }, []);

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
                    {/* Pagination controls can be added here */}
                </div>
            </div>
        </section>
    );
}