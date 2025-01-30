"use client"
import React, {useState, useEffect} from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import {supabase} from "@/libs/supabaseClient";
import {Session} from "@supabase/supabase-js";
import {FetchBeritaById, BeritaType, insertBerita} from "@/data/bertita";
import {fetchRecentUser, UserType} from "@/data/user";
import {useRouter} from "next/navigation";
import TextArea from "@/components/TextArea"
import "../../../css/berita.css"
import SelectKategori from "@/components/FormElements/SelectGroup/SelectKategori";
import SelectBeritaKategori from "@/components/FormElements/SelectGroup/SelectBeritaKategori";
import Alert from "@/components/Alert";

interface FormBeritaProps {
    editing?: boolean;
    defaultValues?: BeritaType;
}

const FormBerita = ({editing, defaultValues}: FormBeritaProps) => {
    const [imageUrl, setImageUrl] = useState<string>("")
    const [session, setSession] = useState<Session | null>(null)
    const [user, setUser] = useState<UserType | null>(null)
    const router = useRouter()
    const [kategoriId, setKategoriId] = useState<string>("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [isAlertVisible, setAlertVisible] = useState(false);

    const [formData, setFormData] = useState<BeritaType>(
        defaultValues || {
            id: 0,
            judul: "",
            image: "",
            created_at: "",
            article: "",
            author_name: "",
            id_kategori: 0
        }
    )

    useEffect(() => {
        if (defaultValues) {
            setFormData(defaultValues);
            setKategoriId(defaultValues.id_kategori.toString());
        }
    }, [defaultValues]);

    useEffect(() => {
        if (kategoriId) {
            setFormData((prev) => ({
                ...prev,
                id_kategori: parseInt(kategoriId, 10) || 0
            }));
        }
    }, [kategoriId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    useEffect(() => {
        const fetchSession = async () => {
            const {data, error} = await supabase.auth.getSession()
            if (error) {
                setAlertMessage(`Error fetching session: ${error}`)
                setAlertVisible(true)
            } else {
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
                    setAlertMessage(`User tidak di temukan`)
                    setAlertVisible(true)
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
        const {error: uploadError} = await supabase.storage
            .from("beritaimage")
            .upload(fileName, file);

        if (uploadError) {
            setAlertMessage(`Error uploading image: ${uploadError}`);
            setAlertVisible(true)
            return null;
        }

        // Mendapatkan URL public untuk file yang baru diupload
        const {data: publicUrlData} = supabase.storage
            .from("beritaimage")
            .getPublicUrl(fileName);

        // Periksa apakah data ada
        if (!publicUrlData) {
            setAlertMessage(`Error fetching file URL: No data returned`);
            setAlertVisible(true)
            return null;
        }


        // Mengembalikan URL yang bisa diakses
        return publicUrlData?.publicUrl || null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.judul.trim()) {
            setAlertMessage("Judul tidak boleh kosong!")
            setAlertVisible(true)
            return;
        }

        if (!formData.article.trim()) {
            setAlertMessage("Artikel tidak boleh kosong!")
            setAlertVisible(true)
            return;
        }

        const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
        const file = fileInput?.files?.[0];

        if (!file && !formData.image.trim()) {
            alert("Harap unggah gambar!");
            return;
        }

        try {
            let uploadedImageUrl: string | null = "";
            if (file) {
                uploadedImageUrl = await uploadFile(file);
            }

            let operationSuccessful = false;

            if (editing && defaultValues?.id) {
                const {error} = await supabase
                    .from("berita")
                    .update({
                        judul: formData.judul,
                        article: formData.article,
                        author_name: user?.username,
                        image: uploadedImageUrl || formData.image,
                        id_kategori: formData.id_kategori
                    })
                    .eq("id", defaultValues.id);

                if (error) {
                    setAlertMessage(`Error updating berita: ${error}`)
                    setAlertVisible(true)
                } else {
                    alert("Data berita berhasil diperbarui");
                    operationSuccessful = true;
                }
            } else {
                const {error} = await insertBerita(
                    formData.judul,
                    formData.article,
                    user?.username,
                    uploadedImageUrl || imageUrl,
                    formData.id_kategori
                );

                if (error) {
                    setAlertMessage(`Error inserting berita: ${error}`)
                    setAlertVisible(true)
                } else {
                    alert("Data berita berhasil ditambahkan");
                    operationSuccessful = true;
                }
            }

            if (operationSuccessful) {
                alert("Berhasil, kembali ke Home");
                router.push("/dashboard/berita");
            }

        } catch (err) {
            setAlertMessage(`Error handling submit berita: ${err}`)
            setAlertVisible(true)
        }
    };


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
                                onChange={(e) => setFormData((prev) => ({...prev, judul: e.target.value}))}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                                Detail Atau Article
                            </label>
                            <TextArea content={formData.article}
                                      onChange={(content) => setFormData((prev) => ({...prev, article: content}))}/>
                        </div>
                        <SelectBeritaKategori onChange={(id) => setKategoriId(id)} defaultValue={formData.id_kategori}/>
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
            <Alert
                message={alertMessage || ""}
                isVisible={isAlertVisible} onClose={() => {
                setAlertVisible(false);
                setAlertMessage(null); // Clear the message when closing
            }}
            />
        </div>
    )
}

export default FormBerita