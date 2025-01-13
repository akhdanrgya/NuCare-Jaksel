"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imageCarousel from '../data/image';
import HeaderCard from './HeaderCard';
import Stats from './Stats';
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-20 text-center h-screen">
      {/* Swiper sebagai Background */}
      <div className="absolute inset-0 z-0">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          className="w-full h-full"
        >
          {imageCarousel.map((src, index) => (
            <SwiperSlide key={index}>
              <Image
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
      <Stats/>
    </section>
  );
};

export default Hero;
