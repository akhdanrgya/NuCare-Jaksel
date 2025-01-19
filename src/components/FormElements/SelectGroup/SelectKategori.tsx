"use client";
import React, { useState, useEffect } from "react";
import { fetchKategori, KategoriType, fetchKategoriById } from "../../../data/kategori";

interface SelectKategoriProps {
  defaultValue: number;
  onChange: (id: string) => void;
}

const SelectKategori: React.FC<SelectKategoriProps> = ({ onChange, defaultValue }) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue.toString());
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [kategori, setKategori] = useState<KategoriType[]>([]);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    const fetchKategoriData = async () => {
      const dataKategori = await fetchKategori();
      setKategori(dataKategori);
    };
    fetchKategoriData();
  }, []);

  useEffect(() => {
    const fetchKategoriByIdx = async () => {
      if (defaultValue) {
        const dataKategori = await fetchKategoriById(defaultValue);
        if (dataKategori) {
          setSelectedOption(dataKategori.id.toString());
        }
      }
    };
    fetchKategoriByIdx();
  }, [defaultValue]);

  console.log(selectedOption);

  return (
    <div className="mb-4.5">
      <label className="mb-3 block text-body-sm text-dark dark:text-white">
        Kategori
      </label>

      <div className="relative z-20 bg-transparent dark:bg-dark-2">
        <select
          value={selectedOption}
          title="kategori"
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
            onChange(e.target.value);
          }}
          className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary ${isOptionSelected ? "text-dark dark:text-white" : "text-dark-6"}`}
        >
          <option value="" disabled>
            Select Kategori
          </option>
          {kategori.length > 0 ? (
            kategori.map((data) => (
              <option key={data.id} value={data.id.toString()}>
                {data.tittle}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Kategori Tidak Tersedia
            </option>
          )}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectKategori;
