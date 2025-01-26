"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../libs/supabaseClient";
import { DonasiType } from "@/data/donations";
import InputGroup from "../../FormElements/InputGroup";
import SelectKategori from "../../FormElements/SelectGroup/SelectKategori";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { fetchRecentUser, UserType } from "@/data/user";

interface FormDonasiProps {
  editing?: boolean;
  defaultValues?: DonasiType;
}

const FormDonasi = ({ editing, defaultValues }: FormDonasiProps) => {
  const [target, setTarget] = useState<string>("");
  const [title, setTittle] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [deadLine, setDeadLine] = useState<Date>(new Date());
  const [article, setArticle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [kategoriId, setKategoriId] = useState<string>("");
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null);
  const [session, setSession] = useState<Session | null>(null)

  const [formData, setFormData] = React.useState<DonasiType>(
    defaultValues || {
      id: 0,
      title: "",
      description: "",
      location: "",
      collected: 0,
      daysLeft: new Date().toISOString().split("T")[0],
      image: imageUrl,
      detail: "",
      donatur: 0,
      url: "",
      kategori: 0,
      target: 0,
      author: ""
    }
  );

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues);
      setFormData(defaultValues);
      setImageUrl(defaultValues.image || "");
    }
  }, [defaultValues]);

  useEffect(() => {
    if (kategoriId) {
      setFormData((prev) => ({
        ...prev,
        kategori: parseInt(kategoriId, 10) || 0
      }));
    }
  }, [kategoriId]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error fetching session:", error)
      } else {
        console.log("Fetched session:", data.session)
        setSession(data.session)
      }
    }
    fetchSession()
  }, [])

  useEffect(() => {
    const getUser = async () => {
      if (session?.user.id) {
        const userData = await fetchRecentUser(session.user.id)
        if (userData) {
          setUser(userData[0] || null)
        } else {
          console.log("User tidak ditemukan")
        }
      }
    }

    if (session) {
      getUser()
    }
  }, [session])


  // handle perubahan input agar diset ke formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = Number(rawValue);
    setFormData((prev) => ({ ...prev, target: formattedValue }));
  };

  const uploadFile = async (file: File) => {
    const folderName = "donasiprivateimg"; // folder gambar donasi private
    const fileName = `${folderName}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("donationimage")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      alert("Gagal mengunggah gambar");
      return null;
    }

    // Mendapatkan URL public untuk file yang baru diupload
    const { data: publicUrlData } = supabase.storage
      .from("donationimage")
      .getPublicUrl(fileName);

    // Periksa apakah data ada
    if (!publicUrlData) {
      console.error("Error fetching file URL: No data returned");
      return null;
    }


    // Mengembalikan URL yang bisa diakses
    return publicUrlData?.publicUrl || null;
  };

  const insertDonations = async (uploadedImageUrl: string | null) => {
    const { data, error } = await supabase.from("donations").insert([
      {
        title: formData.title,
        url: formData.url,
        location: formData.location,
        description: formData.description,
        target: String(formData.target).replace(/\./g, ""),
        daysLeft: formData.daysLeft,
        detail: formData.detail,
        image: uploadedImageUrl || formData.image,
        kategori: formData.kategori,
        collected: formData.collected,
        author: user?.username,
      }
    ]);

    if (error) {
      console.error("Error inserting donation:", error.message);
      alert("Gagal menyimpan data donasi");
    } else {
      console.log("Donation inserted:", data);
      alert("Data donasi berhasil disimpan");
    }

    return { data, error }
  };

  const updateDonations = async (uploadedImageUrl: string | null) => {
    const { data, error } = await supabase
      .from("donations")
      .update({
        title: formData.title,
        url: formData.url,
        location: formData.location,
        description: formData.description,
        target: String(formData.target).replace(/\./g, ""),
        daysLeft: formData.daysLeft,
        detail: formData.detail,
        image: uploadedImageUrl || formData.image,
        kategori: formData.kategori,
        collected: formData.collected,
      })
      .eq("id", formData.id);

    if (error) {
      console.error("Error updating donation:", error.message);
      alert("Gagal memperbarui data donasi");
    } else {
      console.log("Donation updated:", data);
      alert("Data donasi berhasil diperbarui");
    }

    return { data, error }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadedImageUrl: null | string = null;
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      const file = fileInput?.files?.[0];
      if (file) {
        uploadedImageUrl = await uploadFile(file);
      }

      let operationSuccess = false;

      if (editing && defaultValues?.id) {
        const { data, error } = await updateDonations(uploadedImageUrl);

        if (error) {
          console.error("Error updating berita:", error);
          alert("Gagal memperbarui data berita");
        } else {
          alert("Data berita berhasil diperbarui");
          operationSuccess = true;
        }
      } else {
        const { data, error } = await insertDonations(uploadedImageUrl);

        if (error) {
          console.error("Error inserting berita:", error);
          alert("Gagal menambahkan data berita");
        } else {
          alert("Data berita berhasil ditambahkan");
          operationSuccess = true;
        }
      }

      if (operationSuccess) {
        alert("Berhasil, kembali ke Home");
        router.push("/dashboard/donasi");
      }

    } catch (err) {
      console.error("Error handling submit:", err);
      alert("Terjadi kesalahan saat menyimpan data donasi");
    }
  };


  return (
    <div>
      <div
        className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card mb-10">
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
                value={formData.title}
                name="title"
                onChange={handleChange}
              />
              <InputGroup
                label="URL"
                type="text"
                placeholder="Masukkan URL"
                customClasses="w-full xl:w-1/2"
                value={formData.url}
                name="url"
                onChange={handleChange}
              />
            </div>
            <InputGroup
              label="Lokasi"
              type="text"
              placeholder="Masukan Lokasi"
              customClasses="mb-4.5"
              value={formData.location}
              name="location"
              onChange={handleChange}
            />
            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Deskripsi
              </label>
              <textarea
                rows={6}
                placeholder="Masukan Deskripsi"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={formData.description}
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>
            <SelectKategori onChange={(id) => setKategoriId(id)} defaultValue={formData.kategori} />

            <InputGroup
              label="Target"
              type="number"
              placeholder="Masukan Target Donasi"
              customClasses="mb-4.5"
              value={String(formData.target)}
              name="target"
              onChange={handleChange}
            />

            <InputGroup
              label="Tenggat Donasi"
              type="Date"
              placeholder="Masukan Tenggat Donasi"
              customClasses="mb-4.5"
              value={formData.daysLeft}
              name="daysLeft"
              onChange={handleChange}
            />

            <div className="mb-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Detail Atau Article
              </label>
              <textarea
                rows={6}
                placeholder="Masukan Artikel"
                className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                value={formData.detail}
                name="detail"
                onChange={handleChange}
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
            {editing ? (
              <button
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                type="submit"
              >
                Edit
              </button>
            ) : (
              <button
                className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDonasi;
