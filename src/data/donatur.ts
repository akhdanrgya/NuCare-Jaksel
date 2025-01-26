import {supabase} from "../libs/supabaseClient";

export type DonaturType = {
    id: number;
    name: string;
    value: number;
    donationsId: number;
    notelp: number;
    email: string;
    orderId: string;
    created_at?: string;
};

export const insertDonatur = async (donaturData: DonaturType) => {
    try {
        const {data, error} = await supabase
            .from("donatur")
            .insert([
                {
                    name: donaturData.name,
                    value: donaturData.value,
                    donationsId: donaturData.donationsId,
                    notelp: donaturData.notelp,
                    email: donaturData.email,
                    orderId: donaturData.orderId,
                },
            ]);

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error("Error inserting donatur:", error);
        throw error;
    }
};

export const fetchDonaturById = async (donationId: number) => {
    try {
        const {data, error} = await supabase
            .from("donatur")
            .select("*")
            .eq("donationsId", donationId)

        if(error) {
            console.error("Error fetching Donatur:", error);
            return null;
        }
        return data || null;
    } catch (error) {
        console.error("Error fetching Donatur function:", error);
        return null;
    }
}
