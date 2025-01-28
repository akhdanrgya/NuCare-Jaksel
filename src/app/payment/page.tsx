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
    wakafId?: string | null;
};

const TabarruForm = () => {
    const searchParams = useSearchParams();
    const [params, setParams] = useState<ParamsType>({
        wealth: null,
        zakatType: null,
        infakTitle: null,
        wakafId: null
    });

    useEffect(() => {
        const wealth = searchParams.get("wealth");
        const zakatType = searchParams.get("zakatType");
        const infakTitle = searchParams.get("infakTitle");
        const wakafId = searchParams.get("wakafId")

        setParams({
            wealth,
            zakatType,
            infakTitle,
            wakafId
        });
    }, [searchParams]);

    if (!params.wealth) return <div>Loading...</div>;

    return (
        <Suspense>
            <PaymentDonation
                wealth={params.wealth || ""}
                zakatType={params.zakatType || ""}
                infakTitle={params.infakTitle || ""}
                wakafId={params.wakafId || ""}
            />
        </Suspense>
    );
};

export default TabarruForm;
