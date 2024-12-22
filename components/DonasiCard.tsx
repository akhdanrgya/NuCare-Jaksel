"use client";
import { useEffect, useState } from "react";
import { fetchDonations, insertDonations, DonasiType } from "../data/donations";
import { useRouter } from "next/navigation";

const DonasiCards: React.FC = () => {
  const [donations, setDonations] = useState<DonasiType[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchDonationsData = async () => {
      const dataDonations = await fetchDonations();
      setDonations(dataDonations);
    };
    fetchDonationsData();
  }, []);

  const handleCardClick = (url: string) => {
    const formattedurl = url
      .replace(/^#/, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    router.push(`/program/${formattedurl}`);
  };

  const handleProgramClick = () => {
    router.push("/program");
  };

  if (!isMounted) return null;

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h2 className="text-4xl">Ayo Mulai Berdonasi!</h2>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.length > 0 ? (
          donations.map((donasi, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg cursor-pointer"
              onClick={() => handleCardClick(donasi.url)}
            >
              <img
                src={donasi.image}
                alt={donasi.tittle}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  {donasi.tittle}
                </h3>
                <p className="text-gray-700 mb-2">{donasi.description}</p>
                <p className="text-gray-500 text-sm mb-4">
                  📍 {donasi.location}
                </p>
                <p className="text-gray-700 font-bold">
                  Terkumpul: Rp {donasi.collected.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  ⏳ {donasi.daysLeft} Hari lagi
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full py-6">Belum ada data donasi</p>
        )}
      </div>
      <div className="container mx-auto text-center mt-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
          onClick={() => handleProgramClick()}
        >
          Program Lainnya
        </button>
      </div>
    </section>
  );
};

export default DonasiCards;
