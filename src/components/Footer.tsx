import React from "react"
import Image from "next/image"
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});


const Footer: React.FC = () => {
    return (
        <footer className={`${montserrat.variable} font-montserrat py-10 px-44 bg-gray-1 font-light`}>
            <div className="flex gap-4">
                <div className="container mx-auto">
                    <Image
                        src="/images/logo/logoNUCare.png"
                        alt="Logo"
                        width={300}
                        height={200}
                        className="my-4 w-50 h-auto"
                    />
                    <p className="text-sm">NUcare.id adalah situs resmi Lembaga Amil Zakat, Infaq dan Shadaqah NU yang
                        dikelola oleh Pengurus
                        Pusat (Jakarta). Saran dan kritik: email@nucare.id</p>
                </div>

                <div className="container mx-auto">
                    <h1 className="font-bold my-4">Learn More</h1>
                    <ul className="list-none space-y-2">
                        <li>
                            <a href="/" className="">Tentang</a>
                        </li>
                        <li>
                            <a href="/program" className="">Donasi</a>
                        </li>
                        <li>
                            <a href="/berita" className="">Berita</a>
                        </li>
                    </ul>
                </div>


                <div className="container mx-auto">
                    <h1 className="font-bold my-4">NU CARE-LAZIZNU JAKARTA SELATAN</h1>
                    <p className="text-sm">
                        Gedung PBNU, Lt. 2<br/>
                        Jl. Kramat Raya, No. 164, Jakarta Pusat (10430)<br/>
                        Telp: (021) 3102913<br/>
                        Hp/WA: 0813 9800 9800
                    </p>
                </div>


            </div>

            <div>
                <hr className="border-t border-gray-300 my-4"/>
                <p className="text-center py-5">Copyright © 2025 · NU CARE-LAZISNU JAKARTA SELATAN · All Right Reserved</p>
            </div>

        </footer>
    );
};

export default Footer;
  