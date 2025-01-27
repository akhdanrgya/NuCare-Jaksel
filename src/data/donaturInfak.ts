import {supabase} from "@/libs/supabaseClient";

export type DonaturInfakType = {
    id?: number;
    created_at?: string;
    id_infak: number;
    value: number;
    name: string;
    telp: string;
    message: string;
    orderId: string;
    email: string;
}

export const insertDonaturInfak = async (data: DonaturInfakType): Promise<boolean> => {
    const {error} = await supabase
        .from("donatur_infak")
        .insert(data)

    if (error) {
        console.error(error);
        return false
    }
    alert("berhasil menyimpan data donatur infak")
    return true
}