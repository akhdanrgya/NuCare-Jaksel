import {supabase} from "@/libs/supabaseClient";


export const uploadFileGalery = async (file: File): Promise<boolean> => {
    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage.from("galery").upload(filePath, file);

    if (error) {
        console.error("Error uploading file:", error);
        throw error;
    }

    return true;
};


export const deleteFileGalery = async (filePath: string) => {
    const { error } = await supabase.storage.from("galery").remove([filePath]);

    if (error) {
        console.error("Error deleting file:", error.message);
        throw error;
    }

    return { success: true };
};


export const fetchAllGalery = async (): Promise<string[]> => {
    const { data, error } = await supabase.storage.from("galery").list();

    if (error) {
        console.error("Error fetching files:", error);
        throw error;
    }

    const imageUrls: string[] = data?.map(file => {
        const { data: urlData } = supabase.storage.from("galery").getPublicUrl(file.name);

        return urlData ? urlData.publicUrl : "";
    }) || [];

    return imageUrls;
};




