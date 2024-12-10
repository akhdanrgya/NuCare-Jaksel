"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import imageCarousel from '../data/image';

const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-20 text-center h-[500px]">
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
              <img
                src={src}
                alt={`Slide ${index}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Konten Hero */}
      {/* <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Bantu Sesama dengan Donasi</h2>
        <p className="text-lg mb-6">Setiap bantuanmu berarti.</p>
        <button className="mt-6 px-6 py-3 bg-white text-green-500 rounded-lg">Donasi Sekarang</button>
      </div> */}
    </section>
  );
};

export default Hero;
