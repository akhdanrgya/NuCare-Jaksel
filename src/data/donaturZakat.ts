import {supabase} from "@/libs/supabaseClient";

export type DonaturZakatType = {
    id: number;
    created_at: string;
    jenis_zakat: number;
    value: number;
    name: string;
    telp: string;
    message: string;
}

// CRUD

export const insertDonaturZakat = async (data: DonaturZakatType): Promise<boolean> => {
    const {error} = await supabase
        .from("donatur_zakat")
        .insert(data)

    if (error) {
        console.error("Error insert zakat", error.message)
        return false
    }
    ;
    console.log("Insert Zakat Berhasil");
    return true;
}

export const fetchDonaturZakat = async (): Promise<DonaturZakatType[]> => {
    const {data, error} = await supabase
        .from("donatur_zakat")
        .select("*")

    if(error) {
        console.error("Error fetching Donation Zakat", error.message)
        return []
    }

    return data || []
}

export const fetchDonaturZakatByZakatId = async (zakatId: number): Promise<DonaturZakatType[]> => {
    const {data, error} = await supabase
        .from("donatur_zakat")
        .select("*")
        .eq("jenis_zakat", zakatId)

    if(error) {
        console.error("Error fetch zakat donatur by id zakat", error.message)
        return []
    }

    return data || []
}