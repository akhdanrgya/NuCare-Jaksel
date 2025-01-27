"use client";

import PaymentDonation from "@/components/PaymentDonation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type ParamsType = {
    wealth: string | null;
    zakatType?: string | null;
    infakTitle?: string | null;
};

const TabarruForm = () => {
    const searchParams = useSearchParams();
    const [params, setParams] = useState<ParamsType>({
        wealth: null,
        zakatType: null,
        infakTitle: null
    });

    useEffect(() => {
        const wealth = searchParams.get("wealth");
        const zakatType = searchParams.get("zakatType");
        const infakTitle = searchParams.get("infakTitle");

        setParams({
            wealth,
            zakatType,
            infakTitle,
        });
    }, [searchParams]);

    if (!params.wealth) return <div>Loading...</div>;

    return (
        <Suspense>
            <PaymentDonation
                wealth={params.wealth || ""}
                zakatType={params.zakatType || ""}
                infakTitle={params.infakTitle || ""}
            />
        </Suspense>
    );
};

export default TabarruForm;
