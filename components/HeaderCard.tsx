"use client";

import { useState } from "react";

const HeaderCard: React.FC = () => {
  // State untuk jenis donasi yang dipilih
  const [donationType, setDonationType] = useState<string>("zakat");

  // Handle perubahan pilihan jenis donasi
  const handleDonationTypeChange = (type: string) => {
    setDonationType(type);
  };

  return (
    <div className="absolute top-1/4 right-0 m-4 bg-white p-8 rounded-lg shadow-xl z-20 w-100">
      <form>
        {/* Pilihan Donasi dengan tombol */}
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${
              donationType === "zakat"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleDonationTypeChange("zakat")}
          >
            Zakat
          </button>
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${
              donationType === "infak"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleDonationTypeChange("infak")}
          >
            Infak
          </button>
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${
              donationType === "wakaf"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleDonationTypeChange("wakaf")}
          >
            Wakaf
          </button>
        </div>

        {/* Form Dinamis berdasarkan pilihan Donasi */}
        {donationType === "zakat" && (
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Ayo hitung zakat kamu !
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Coba masukkan jumlah hartamu dan kalkulator kami akan menghitung
                jumlah zakatnya
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="wealth" className="block text-gray-700 mb-2">
                Kekayaan (1 tahun)
              </label>
              <input
                id="wealth"
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                placeholder="Masukkan jumlah kekayaan"
              />
            </div>
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Zakat Maal Kamu: Rp 0
              </p>
            </div>

            <div className="text-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                Bayar Zakat
              </button>
            </div>
          </div>
        )}

        {donationType === "infak" && (
          <div className="mb-4">
            <label htmlFor="infakPurpose" className="block text-gray-700">
              Tujuan Infak
            </label>
            <input
              id="infakPurpose"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Tujuan Infak"
            />
          </div>
        )}
        {donationType === "wakaf" && (
          <div className="mb-4">
            <label htmlFor="wakafPurpose" className="block text-gray-700">
              Tujuan Wakaf
            </label>
            <input
              id="wakafPurpose"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Tujuan Wakaf"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default HeaderCard;
