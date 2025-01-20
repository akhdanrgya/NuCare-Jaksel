"use client"
import React, { useState, useEffect } from "react";
import Card from "@/components/dashboard/Berita";
import InputGroup from "@/components/FormElements/InputGroup";
import { supabase } from "@/libs/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { FetchBeritaById, BeritaType, insertBerita } from "@/data/bertita";
import { fetchRecentUser, UserType } from "@/data/user";

interface FormBeritaProps {
    editing?: boolean;
    defaultValues?: BeritaType;
}

const FormBerita = ({ editing, defaultValues }: FormBeritaProps) => {
    const [imageUrl, setImageUrl] = useState<string>("")
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<UserType | null>(null)

    const [formData, setFormData] = useState<BeritaType>(
        defaultValues || { id: 0, judul: "", image: "", created_at: "", kategori: "", article: "", author_name: "" }
    )

    useEffect(() => {
        if (defaultValues) {
            console.log(defaultValues)
            setFormData(defaultValues)
        }
    }, [defaultValues])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

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

    const uploadFile = async (file: File) => {
        const folderName = "beritaprivateimg"; // folder gambar donasi private
        const fileName = `${folderName}/${Date.now()}-${file.name}`;

        // Upload file ke folder 'private' di bucket 'ngetes'
        const { error: uploadError } = await supabase.storage
            .from("beritaimage")
            .upload(fileName, file);

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            alert("Gagal mengunggah gambar");
            return null;
        }

        // Mendapatkan URL public untuk file yang baru diupload
        const { data: publicUrlData } = supabase.storage
            .from("beritaimage")
            .getPublicUrl(fileName);

        // Periksa apakah data ada
        if (!publicUrlData) {
            console.error("Error fetching file URL: No data returned");
            return null;
        }


        // Mengembalikan URL yang bisa diakses
        return publicUrlData?.publicUrl || null;
    }


    const updateBerita = async (id: number, uploadedImageUrl: string | null) => {
        const { data, error } = await supabase
            .from("berita")
            .update([
                {
                    judul: formData.judul,
                    article: formData.article,
                    author_name: user?.username,
                    image: uploadedImageUrl || formData.image,
                }
            ])
            .eq("id", id)

        if (error) {
            console.error("Error updating berita:", error)
            alert("Gagal memperbarui data berita")
        } else {
            alert("Data berita berhasil diperbarui")
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.judul.trim()) {
            alert("Judul tidak boleh kosong!")
            return
        }

        if (!formData.article.trim()) {
            alert("Artikel tidak boleh kosong!")
            return
        }

        const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]')
        const file = fileInput?.files?.[0]
        if (!file && !formData.image.trim()) {
            alert("Harap unggah gambar!")
            return
        }


        try {
            let uploadedImageUrl: string | null = ""
            if (file) {
                uploadedImageUrl = await uploadFile(file)
            }

            if (editing && defaultValues?.id) {
                await updateBerita(defaultValues.id, uploadedImageUrl)
            } else {
                await insertBerita(
                    formData.judul,
                    formData.article,
                    user?.username,
                    uploadedImageUrl || imageUrl

                )
            }

        } catch (err) {
            console.error("Error handling submit berita:", err)
            alert("Terjadi kesalahan saat menyimpan data berita")
        }
    }


    return (
        <div className="w-full h-full">
            <div
                className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card mb-10">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                    <h3 className="font-semibold text-dark dark:text-white">Form Berita</h3>
                </div>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                            <InputGroup
                                label="Judul"
                                type="text"
                                placeholder="Masukan Judul"
                                customClasses="w-full xl:w-1/2"
                                value={formData.judul}
                                onChange={(e) => setFormData((prev) => ({ ...prev, judul: e.target.value }))}
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
                                value={formData.article}
                                onChange={(e) => setFormData((prev) => ({ ...prev, article: e.target.value }))}
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
    )
}

export default FormBerita
