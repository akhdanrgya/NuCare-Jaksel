import { supabase } from "@/libs/supabaseClient"
import { BaseData } from "@/components/Table";
import { DonaturWakafType } from "./donaturWakaf";

export type WakafType = BaseData & {
    id?: number
    created_at?: string
    title: string
    amount: number
}

// CRUD

export const fetchWakafAmount = async (wakafId: number) => {
    const { data, error } = await supabase
        .from("wakaf")
        .select("amount")
        .eq("id", wakafId)
        .single()

    if (error) {
        console.log(error)
        return 0
    }

    return data.amount
}

export const fetchWakaf = async (): Promise<WakafType[]> => {
    const { data, error } = await supabase
        .from("wakaf")
        .select("*")

    if (error) {
        console.error("Error fetching Wakaf", error.message)
        return []
    }
    return data || []
}

export const insertWakafAmount = async (value: number, wakafId: number): Promise<boolean> => {
    const amount = await fetchWakafAmount(wakafId)
    const hasil = amount + value
    const { error } = await supabase
        .from("wakaf")
        .update({ amount: hasil })
        .eq("id", wakafId)

    return !error;

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

export const insertWakaf = async (data: WakafType): Promise<boolean> => {
    const { error } = await supabase
        .from("wakaf")
        .insert(data);

    if (error) {
        console.error("Error inserting Wakaf: ", error);
        return false;
    }

    return true;
};