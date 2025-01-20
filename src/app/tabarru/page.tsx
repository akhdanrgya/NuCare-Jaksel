"use client"

import PaymentDonation from "@/components/PaymentDonation"
import { useSearchParams } from "next/navigation";

const TabarruForm = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get("wealth"); // Mengambil query parameter wealth

    console.log(`nilai wealth di URL: ${data}`)
    // Ensure 'data' is a string (if it's an array, pick the first item)
    const wealth = Array.isArray(data) ? data[0] : data;

    return (
        <PaymentDonation wealth={wealth} />
    )
}

export default TabarruForm;
