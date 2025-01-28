import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import InfakPage from "@/components/dashboard/Infak/InfakPage";

const DashboardInfak = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Infak" />
            <InfakPage />
        </DefaultLayout>
    );
};

export default DashboardInfak;
