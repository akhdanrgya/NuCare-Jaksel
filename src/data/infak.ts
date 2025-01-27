import {supabase} from "@/libs/supabaseClient";

export type InfakType = {
    id?: number
    created_at?: string
    title: string
    amount: number
}

export const fetchInfak = async (): Promise<InfakType[]> => {
    const {data, error} = await supabase
        .from("infak")
        .select("*")

    if (error) {
        return []
        console.error("error fetching Infak: ", error)
    }

    return data || []

}

export const insertInfak = async (data: InfakType): Promise<boolean> => {
    const {error} = await supabase
        .from("infak")
        .insert(data)

    if (error) {
        console.error("error inserting Infak: ", error)
        return false
    }

    return true;
}