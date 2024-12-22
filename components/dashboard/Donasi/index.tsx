'use client'
import React, { useState } from "react";
import Card from "./Card";
import InputGroup from "../../FormElements/InputGroup";
import SelectKategori from "../../FormElements/SelectGroup/SelectKategori";
import DatePickerTwo from "../../FormElements/DatePicker/DatePickerTwo";

const Donasi = () => {
  const [target, setTarget] = useState<string>("");

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    const formattedValue = new Intl.NumberFormat("id-ID").format(
      parseInt(numericValue || "0")
    );

    return formattedValue;
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatNumber(rawValue);
    setTarget(formattedValue);
  };

  return (
    <div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card mb-10">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-semibold text-dark dark:text-white">
            Form Donasi
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <InputGroup
                label="Judul"
                type="text"
                placeholder="Masukan Judul"
                customClasses="w-full xl:w-1/2"
              />

              <InputGroup
                label="URL"
                type="text"
                placeholder="Masukan URL"
                customClasses="w-full xl:w-1/2"
              />
            </div>

            <InputGroup
              label="Lokasi"
              type="text"
              placeholder="Masukan Lokasi"
              customClasses="mb-4.5"
            />

            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Deskripsi
              </label>
              <textarea
                rows={6}
                placeholder="Type your message"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <SelectKategori />

            <InputGroup
              label="Target"
              type="text" // Ganti type jadi text supaya bisa memformat angka
              placeholder="Masukan Target Donasi"
              customClasses="mb-4.5"
              value={target}
              onChange={handleTargetChange} // Handle perubahan input
            />

            <DatePickerTwo/>

            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Detail Atau Article
              </label>
              <textarea
                rows={6}
                placeholder="Type your message"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <button className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Card />
    </div>
  );
};

export default Donasi;
