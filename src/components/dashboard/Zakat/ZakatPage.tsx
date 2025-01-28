"use client";
import React from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import { useState, useEffect } from 'react';

export default function ZakatPage() {

    const handleSearch = () => {
        console.log("jalan")
    }



    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* TOP */}
            <div className='flex items-center justify-between'>
                <button className='hidden md:block text-lg font-semibold bg-green-200 rounded-md'>New Infak Program</button>
                <SearchForm onSearch={handleSearch} />
            </div>
            {/* List */}
            <div className=''>

            </div>
            {/* Pagination */}
            <div className=''>

            </div>

        </div>
    )
}
