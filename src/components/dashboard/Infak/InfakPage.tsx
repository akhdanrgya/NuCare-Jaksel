"use client";
import React, { useEffect, useState } from 'react';
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { Montserrat } from "next/font/google";
import { fetchInfak, InfakType, insertInfak } from '@/data/infak';
import Table from "@/components/Table";
import InputGroup from "@/components/FormElements/InputGroup";

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
    const [data, setData] = useState<InfakType[]>([]);
    const [formData, setFormData] = useState<{ title: string; amount: number }>({ title: '', amount: 0 });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newInfak: InfakType = {
            id: data.length + 1,
            title: formData.title,
            amount: formData.amount,
        };

        const success = await insertInfak(newInfak);
        if (success) {
            setData(prev => [...prev, newInfak]); // Update local state
            setFormData({ title: '', amount: 0 }); // Reset form
        }
    };

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

            <form onSubmit={handleSubmit}>
                <div className="container mx-auto px-4 my-10">
                    <InputGroup
                        label="Input New Infak"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Masukan Judul Infak"
                        customClasses="w-full xl:w-1/2"
                        classInput="w-full rounded-[7px] bg-white border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                    <button
                        className="my-10 flex w-1/6 justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
}