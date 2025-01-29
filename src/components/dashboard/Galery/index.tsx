"use client"
import { Montserrat } from "next/font/google";
import React, { useRef } from "react";
import {uploadFileGalery, deleteFileGalery} from "@/data/galery";
import GaleryCard from "@/components/GaleryCard";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const GaleryPage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const success = await uploadFileGalery(file);
            if (success) {
                alert("File uploaded successfully");
            }
        } catch (error) {
            alert("Upload failed");
        }
    };

    return (
        <section className={`${montserrat.variable} font-montserrat`}>
            <div className="flex justify-end">
                <button
                    onClick={handleUploadClick}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300">
                    Add New Photos
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div className="mt-20">
                <GaleryCard/>
            </div>

        </section>
    );
};

export default GaleryPage;