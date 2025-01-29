
import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const Footer: React.FC = () => {
    return (
        <footer
            className={`${montserrat.variable} font-montserrat py-10 px-6 md:px-16 lg:px-44 bg-gray-100 font-light`}
        >
            <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                <div className="md:w-1/3">
                    <Image
                        src="/images/logo/logoNUCare.png"
                        alt="Logo"
                        width={300}
                        height={200}
                        className="my-4 w-40 md:w-50 h-auto"
                    />
                    <p className="text-sm">
                        nucarejaksel.or.id adalah situs resmi Lembaga Amil Zakat, Infaq dan
                        Shadaqah NU yang dikelola oleh Pengurus Cabang Nahdlatul Ulama Kota
                        Administrasi Jakarta Selatan. Saran dan kritik:
                        admin@nucarejaksel.or.id
                    </p>
                </div>

                <div className="md:w-1/3">
                    <p className="font-bold my-4">Learn More</p>
                    <ul className="list-none space-y-2">
                        <li>
                            <a href="/" className="hover:underline">Tentang</a>
                        </li>
                        <li>
                            <a href="/program" className="hover:underline">Donasi</a>
                        </li>
                        <li>
                            <a href="/berita" className="hover:underline">Berita</a>
                        </li>
                    </ul>
                </div>

                <div className="md:w-1/3">
                    <p className="font-bold my-4">NU CARE-LAZISNU JAKARTA SELATAN</p>
                    <p className="text-sm">
                        Gedung PCNU Jaksel, Lt. 1<br />
                        Jl. P. Antasari, No. 57, Jakarta Selatan (12150)<br />
                        Hp/WA: 0812 9539 2003
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <hr className="border-t border-gray-300" />
                <p className="text-center text-xs mt-4">
                    Copyright © 2025 · NU CARE-LAZISNU JAKARTA SELATAN · All Rights
                    Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;