import { supabase } from "@/libs/supabaseClient";
import { insertWakafAmount } from "./wakaf";


export type DonaturWakafType = {
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