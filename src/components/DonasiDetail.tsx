"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchUrl } from "../data/donations";
import { DonasiType } from "../data/donations";
import { formatRupiah } from "@/utils/formatRupiah";
import { useRouter } from "next/navigation";

const DonasiDetail = () => {
  const { url } = useParams();
  const [donation, setDonation] = useState<DonasiType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getDonation = async () => {
      if (url && typeof url === "string") {
        const donationData = await fetchUrl(url);
        if (donationData) {
          setDonation(donationData);
        } else {
          setError("Donasi tidak ditemukan");
        }
      }
      setLoading(false);
    };

    getDonation();
  }, [url]);

  const handleDonasi = () => {
    router.push(`/program/${url}/payment`);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            className="rounded-lg shadow-lg w-full h-auto object-cover"
            src={donation?.image}
            alt={donation?.title}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-semibold text-center md:text-left mb-6">
            {donation?.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{donation?.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="font-semibold text-gray-600">Lokasi:</p>
              <p>{donation?.location}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">
                Jumlah yang terkumpul:
              </p>
              <p>
                {donation?.collected
                  ? formatRupiah(Number(donation.collected))
                  : "Belum ada donasi"}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Sisa hari:</p>
              <p>{donation?.daysLeft}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={() => handleDonasi()}
            >
              Donasi Sekarang
            </button>
          </div>
        </div>
      </div>

      {/*Article*/}

      <div className="max-w-7xl mx-auto py-10 px-5 md:px-10 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10">
        <p>{donation?.detail}</p>
      </div>
    </section>
  );
};

export default DonasiDetail;
