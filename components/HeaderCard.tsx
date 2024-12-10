"use client"

import { useState } from 'react';

const HeaderCard: React.FC = () => {
  // State untuk jenis donasi yang dipilih
  const [donationType, setDonationType] = useState<string>(''); 

  // Handle perubahan pilihan jenis donasi
  const handleDonationTypeChange = (type: string) => {
    setDonationType(type);
  };

  return (
    <div className="absolute top-1/3 right-0 m-4 bg-white p-8 rounded-lg shadow-xl z-20 w-80">
      <h3 className="text-2xl font-bold text-center mb-4 text-black">Form Donasi</h3>
      <form>
        {/* Pilihan Donasi dengan tombol */}
        <div className="mb-4 flex justify-between">
          <button 
            type="button" 
            className={`w-24 py-2 rounded-lg ${donationType === 'zakat' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleDonationTypeChange('zakat')}
          >
            Zakat
          </button>
          <button 
            type="button" 
            className={`w-24 py-2 rounded-lg ${donationType === 'infak' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleDonationTypeChange('infak')}
          >
            Infak
          </button>
          <button 
            type="button" 
            className={`w-24 py-2 rounded-lg ${donationType === 'wakaf' ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => handleDonationTypeChange('wakaf')}
          >
            Wakaf
          </button>
        </div>

        {/* Input Nama */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Masukkan Nama"
          />
        </div>

        {/* Input Jumlah Donasi */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Jumlah Donasi</label>
          <input
            id="amount"
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Masukkan Jumlah"
          />
        </div>

        {/* Form Dinamis berdasarkan pilihan Donasi */}
        {donationType === 'zakat' && (
          <div className="mb-4">
            <label htmlFor="zakatPurpose" className="block text-gray-700">Tujuan Zakat</label>
            <input
              id="zakatPurpose"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Tujuan Zakat"
            />
          </div>
        )}
        {donationType === 'infak' && (
          <div className="mb-4">
            <label htmlFor="infakPurpose" className="block text-gray-700">Tujuan Infak</label>
            <input
              id="infakPurpose"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Tujuan Infak"
            />
          </div>
        )}
        {donationType === 'wakaf' && (
          <div className="mb-4">
            <label htmlFor="wakafPurpose" className="block text-gray-700">Tujuan Wakaf</label>
            <input
              id="wakafPurpose"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Masukkan Tujuan Wakaf"
            />
          </div>
        )}

        {/* Tombol Donasi */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4"
        >
          Donasi Sekarang
        </button>
      </form>
    </div>
  );
};

export default HeaderCard;
