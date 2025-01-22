"use client";

import PaymentDonation from "@/components/PaymentDonation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TabarruForm = () => {
    const searchParams = useSearchParams();
    const [wealth, setWealth] = useState<string | null>(null);

    useEffect(() => {
        const data = searchParams.get("wealth");
        console.log(`nilai wealth di URL: ${data}`);
        setWealth(Array.isArray(data) ? data[0] : data);
    }, [searchParams]);

    // Jangan render `PaymentDonation` sampai wealth siap
    if (!wealth) return <div>Loading...</div>;

    return <PaymentDonation wealth={wealth} />;
};

export default TabarruForm;
