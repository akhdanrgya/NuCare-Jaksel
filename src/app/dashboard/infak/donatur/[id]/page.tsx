"use client"
import React, { useEffect, useState } from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import { fetchDonaturInfak, DonaturInfakType, fetchDonaturInfakById } from "@/data/donaturInfak";
import Table from "@/components/Table";
import { useParams } from 'next/navigation';
import DefaultLayout from '@/components/dashboard/Layouts/DefaultLaout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

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
    const { id } = useParams();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDonatur = async () => {
            if (id) {
                setLoading(true);
                try {
                    console.log(`idnya: ${id}`)
                    const data = await fetchDonaturInfakById(Number(id));
                    console.log(`datanya: ${data}`)
                    setData(data);
                } catch (err) {
                    setError("Failed to load data");
                } finally {
                    setLoading(false);
                }
            }
            else {
                console.log(id)
            }
        };

        if (id) {
            fetchDonatur();
        }
    }, [id]);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Infak" />
            <section className={`${montserrat.variable} font-montserrat`}>
                {/* TOP */}
                <div className="m-10 flex justify-between">
                    <SearchForm header={false} search={"Infak"} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* List */}
                    <div className=''>
                        <Table columns={columns} data={data} />
                    </div>
                    {/* Pagination */}
                    <div className=''>
                        idnya: {id}
                    </div>

                </div>
            </section>
        </DefaultLayout>

    )
}
