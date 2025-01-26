"use client";

import PaymentDonation from "@/components/PaymentDonation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {Suspense} from "react";

export const dynamic = "force-dynamic";

const TabarruForm = () => {
    const searchParams = useSearchParams();
    const [wealth, setWealth] = useState<string | null>(null);

    useEffect(() => {
        const data = searchParams.get("wealth");
        console.log(`nilai wealth di URL: ${data}`);
        setWealth(Array.isArray(data) ? data[0] : data);
    }, [searchParams]);

    if (!wealth) return <div>Loading...</div>;

    return (
        <Suspense>
            <PaymentDonation wealth={wealth} />;
        </Suspense>
    )
};

export default TabarruForm;
