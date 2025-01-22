import React from "react";
import YoutubeVideoFrame from "@/components/YoutubeVideoFrame";
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const Profile = () => {
    return (
        <section className={`${montserrat.variable} font-montserrat py-24`}>
            <div className="container mx-auto px-4">

                <div className="flex flex-col lg:flex-row items-center gap-4 justify-center">
                    <div className="w-2/5">
                        <YoutubeVideoFrame videoId="S4kgqJnMELk" />
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <p className="text-justify leading-relaxed">
                            19 tahun sudah LAZISNU PBNU berkiprah di dunia filantropi, dalam misi kemanusiaan. Dengan melibatkan lebih
                            dari ratusan ribu donatur dan relawan, LAZISNU telah memberikan manfaat kepada jutaan jiwa/warga yang
                            membutuhkan.
                            <br />
                            <br />
                            Guna membangun LAZISNU menjadi satu struktur lembaga yang koheren, serta memanfaatkan potensi era digital
                            untuk meningkatkan efisiensi, transparansi dan partisipasi dalam pengumpulan dan pengelolaan zakat, maka
                            di tahun 2024 LAZISNU PBNU melaksanakan Rapat Kerja Nasional (Rakernas) dengan mengambil tema "Unlocking
                            the Potential of Amil Zakat in the Digital Era”.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
