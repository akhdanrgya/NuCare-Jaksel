import {supabase} from "@/libs/supabaseClient";
import {BaseData} from "@/components/Table";

export type InfakType = BaseData & {
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

export const fetchInfakAmount = async (infakId: number) => {
    const {data, error} = await supabase
        .from("infak")
        .select("amount")
        .eq("id", infakId)
        .single()

    if(error){
        console.log(error)
        return 0
    }

    return data.amount
}

export const insertInfakAmount = async (value: number, infakId: number): Promise<boolean> => {
    const amount = await fetchInfakAmount(infakId)
    const hasil = amount + value
    const {error} = await supabase
        .from("infak")
        .update({amount: hasil})
        .eq("id", infakId)

    console.log(infakId)
    console.log(amount)

    return !error;
}