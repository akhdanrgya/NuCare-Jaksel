"use client";

import { useState, useEffect } from "react";
import InputGroup from "./FormElements/InputGroup";
import { useRouter } from "next/navigation";

const HeaderCard: React.FC = () => {
  // default cardnya zakat
  const [donationType, setDonationType] = useState<string>("zakat");
  const [wealth, setWealth] = useState<number>(0);
  const [calculatedZakat, setCalculatedZakat] = useState<number>(0);
  const router = useRouter();

  const handleDonationTypeChange = (type: string) => {
    setDonationType(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWealth(parseInt(e.target.value) || 0);
  };

  useEffect(() => {
    if (donationType === "zakat") {
      setCalculatedZakat(wealth * 0.025); // Hitung zakat jika donasi adalah zakat
    }
  }, [wealth, donationType]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/tabarru?wealth=${donationType === "zakat" ? calculatedZakat : wealth}`);

  };


  return (
    <div className="absolute top-1/5 right-0 m-4 bg-white p-8 rounded-lg shadow-xl z-20 w-100">
      <form
        onSubmit={handleSubmit}
      >
        {/* Pilihan Donasi dengan tombol */}
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${donationType === "zakat"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
              }`}
            onClick={() => handleDonationTypeChange("zakat")}
          >
            Zakat
          </button>
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${donationType === "infak"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-black"
              }`}
            onClick={() => handleDonationTypeChange("infak")}
          >
            Infak
          </button>
          <button
            type="button"
            className={`w-24 py-2 rounded-lg mx-2 ${donationType === "wakaf"
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
              <InputGroup
                id="wealth"
                type="number"
                placeholder="Masukkan jumlah kekayaan"
                customClasses=""
                value={String(wealth)}
                onChange={handleInputChange}
                classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
              />
            </div>
            <div className="text-center mb-6">
              <p className="text-lg font-semibold text-gray-800">
                Zakat Maal Kamu: Rp {calculatedZakat}
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
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Ayo mulai infak
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Silakan isi jumlah infakmu. Insya Allah berkah.
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="wealth" className="block text-gray-700 mb-2">
                Nominal infak
              </label>
              <InputGroup
                id="wealth"
                type="number"
                placeholder="Masukkan jumlah kekayaan"
                customClasses=""
                value={String(wealth)}
                onChange={handleInputChange}
                classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
              />
            </div>

            <div className="text-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                Infak sekarang
              </button>
            </div>
          </div>
        )}
        {donationType === "wakaf" && (
          <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-center text-gray-800">
                Ayo mulai wakaf
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Mari wakaf tunai bersama kami!
              </p>
            </div>

            <div className="mb-4">
              <label htmlFor="wealth" className="block text-gray-700 mb-2">
                Nominal Wakaf
              </label>
              <InputGroup
                id="wealth"
                type="number"
                placeholder="Masukkan jumlah kekayaan"
                customClasses=""
                value={String(wealth)}
                onChange={handleInputChange}
                classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
              />
            </div>

            <div className="text-center">
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                Wakaf sekarang
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default HeaderCard;
