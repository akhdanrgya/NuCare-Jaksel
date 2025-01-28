import { supabase } from "@/libs/supabaseClient"

export type WakafType = {
    id: number
    created_at: string
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
