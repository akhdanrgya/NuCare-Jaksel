import { supabase } from "@/libs/supabaseClient";
import { insertWakafAmount } from "./wakaf";
import { BaseData } from "@/components/Table";


export type DonaturWakafType = BaseData & {
    id?: number;
    created_at?: string;
    id_wakaf: number;
    value: number;
    name: string;
    telp: string;
    message: string;
    orderId: string;
    email: string;
}

export const insertDonaturWakaf = async (data: DonaturWakafType): Promise<boolean> => {
    const { error } = await supabase
        .from("donatur_wakaf")
        .insert(data)

    if (error) {
        console.error(error);
        return false
    }

    insertWakafAmount(data.value, data.id_wakaf)

    alert("berhasil menyimpan data donatur wakaf")
    return true
}

export const fetchDonaturWakaf = async (): Promise<DonaturWakafType[]> => {
    const { data, error } = await supabase
        .from("donatur_wakaf")
        .select("*")

    if (error) {
        console.error("Error fetching donatur Wakaf", error.message);
        return []
    }

    return data || []
}

export const fetchDonaturWakafById = async (id: number): Promise<DonaturWakafType[]> => {
    const { data, error } = await supabase
        .from("donatur_wakaf")
        .select("*")
        .eq("id_wakaf", id)


    if (error) {
        console.error("Error fetching Donatur Wakaf", error.message);
        return []
    }

    return data || []
}