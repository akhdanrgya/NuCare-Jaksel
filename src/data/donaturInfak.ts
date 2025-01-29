import {supabase} from "@/libs/supabaseClient";
import {insertInfakAmount} from "@/data/infak";

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

    insertInfakAmount(data.value, data.id_infak)

    alert("berhasil menyimpan data donatur infak")
    return true
}

export const fetchDonaturInfak = async (): Promise<DonaturInfakType[]> => {
    const {data, error} = await supabase
        .from("donatur_infak")
        .select("*")

    if (error) {
        console.error("Error fetching Donatur Infak",error.message);
        return []
    }

    return data || []
}