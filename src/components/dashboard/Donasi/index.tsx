"use client";
import React, { useState } from "react";
import Card from "./Card";
import InputGroup from "../../FormElements/InputGroup";
import SelectKategori from "../../FormElements/SelectGroup/SelectKategori";
import { supabase } from "../../../libs/supabaseClient";
import { DatePicker } from "@nextui-org/date-picker";

const Donasi = () => {
  const [target, setTarget] = useState<string>("");
  const [tittle, setTittle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [deadLine, setDeadLine] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [kategoriId, setKategoriId] = useState<string>("");

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

  const uploadFile = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("donationimage")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      alert("Gagal mengunggah gambar");
      setImageUrl("https://placehold.co/300x200")
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from("donationimage")
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl || null;
  };

  const insertDonations = async (uploadedImageUrl: string | null) => {
    const { data, error } = await supabase.from("donations").insert([
      {
        tittle,
        url,
        location,
        description: desc,
        target: target.replace(/\./g, ""),
        daysLeft: deadLine,
        detail: article,
        image: uploadedImageUrl || imageUrl,
        kategori: kategoriId,
        collected: 0
      },
    ]);

    if (error) {
      console.error("Error inserting donation:", error);
      alert("Gagal menyimpan data donasi");
    } else {
      console.log("Donation inserted:", data);
      alert("Data donasi berhasil disimpan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadedImageUrl: null | string = "";
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      const file = fileInput?.files?.[0];
      if (file) {
        uploadedImageUrl = await uploadFile(file);
      }

      await insertDonations(uploadedImageUrl);
    } catch (err) {
      console.error("Error handling submit:", err);
      alert("Terjadi kesalahan saat menyimpan data donasi");
    }
  };

  return (
    <div>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card mb-10">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-semibold text-dark dark:text-white">Form Donasi</h3>
        </div>
        <form action="#" onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <InputGroup
                label="Judul"
                type="text"
                placeholder="Masukan Judul"
                customClasses="w-full xl:w-1/2"
                value={tittle}
                onChange={(e) => setTittle(e.target.value)}
              />
              <InputGroup
                label="URL"
                type="text"
                placeholder="Masukkan URL"
                customClasses="w-full xl:w-1/2"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <InputGroup
              label="Lokasi"
              type="text"
              placeholder="Masukan Lokasi"
              customClasses="mb-4.5"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Deskripsi
              </label>
              <textarea
                rows={6}
                placeholder="Masukan Deskripsi"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <SelectKategori onChange={(id) => setKategoriId(id)} />
            <InputGroup
              label="Target"
              type="text"
              placeholder="Masukan Target Donasi"
              customClasses="mb-4.5"
              value={target}
              onChange={handleTargetChange}
            />

            <div className="w-full max-w-xl flex flex-row gap-4 mb-4.5 ">
              <DatePicker
                showMonthAndYearPickers
                label="Tenggat Waktu"
                variant="bordered"
                onChange={(date) => setDeadLine(date?.toString().split("T")[0] || "")}
              />
            </div>
            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Detail Atau Article
              </label>
              <textarea
                rows={6}
                placeholder="Masukan Artikel"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Upload Gambar
              </label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                placeholder="."
              />
            </div>
            <button
              className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              type="submit"
            >
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
