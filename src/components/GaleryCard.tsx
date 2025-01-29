"use client"
import {useState, useEffect} from "react";
import {Montserrat} from "next/font/google";
import {fetchAllGalery, deleteFileGalery} from "@/data/galery";
import Image from "next/image";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-montserrat",
});

const GaleryCard = () => {
    const [dataImage, setDataImage] = useState<{ url: string, filePath: string }[]>([]);

    useEffect(() => {
        const fetchImage = async () => {
            const data = await fetchAllGalery();
            if (!data) {
                console.log("error fetching image data");
                return;
            }
            setDataImage(data.map((url) => ({
                url,
                filePath: url.split('/').pop() || ""
            })));
        };

        fetchImage();
    }, []);

    const handleDelete = async (filePath: string) => {
        const response = await deleteFileGalery(filePath);
        if (response.success) {
            setDataImage(prev => prev.filter(image => image.filePath !== filePath));
        } else {
            console.log("Failed to delete image");
        }
    };

    return (
        <div className={`${montserrat.variable} font-montserrat`}>
            <div className="grid grid-cols-3 gap-4">
                {dataImage.map((image, index) => (
                    <div key={index}
                         className="bg-white rounded-lg shadow-md border border-gray-200 transition transform hover:-translate-y-2 hover:shadow-lg">

                        <div className="overflow-hidden rounded-t-lg">

                            <Image
                                src={image.url}
                                alt={`Gallery Image ${index}`}
                                width={1020}
                                height={1920}
                                objectFit="cover"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <button
                                    onClick={() => handleDelete(image.filePath)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-300 font-montserrat"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GaleryCard;
