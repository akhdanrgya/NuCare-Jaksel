"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imageCarousel from '../data/image';
import HeaderCard from './TabarruCard';
import {Montserrat} from "next/font/google";
import {useState, useEffect} from "react";
import {fetchAllGalery} from "@/data/galery";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const Hero: React.FC = () => {
    const [dataImage, setDataImage] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllGalery();
            if(!data){
                console.log("No data image")
                return
            }

            setDataImage(data)
        }

        fetchData();
    },[])

  return (
    <section className={`${montserrat.variable} font-montserrat relative text-white py-20 text-center h-screen`}>
      {/* Swiper sebagai Background */}
      <div className="absolute inset-0 z-0">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          className="w-full h-full"
        >
          {dataImage.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Card Form Donasi di Pojok Kanan */}
      <HeaderCard />
      {/*<Stats/>*/}
    </section>
  );
};

export default Hero;
