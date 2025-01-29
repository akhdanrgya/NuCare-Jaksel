"use client"
import React from 'react'
import SearchForm from "@/components/dashboard/Header/SearchForm";
import Link from "next/link";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default function InfakPage() {
  return (
      <section className={`${montserrat.variable} font-montserrat`}>
        {/* TOP */}
        <div className="m-10 flex justify-between">
          <SearchForm header={false} search={"Zakat"}/>
          <Link href="/dashboard/berita/add">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300">
              New Zakat Program
            </button>
          </Link>
        </div>

        <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* List */}
          <div className=''>

          </div>
          {/* Pagination */}
          <div className=''>

          </div>

        </div>
      </section>
  )
}
