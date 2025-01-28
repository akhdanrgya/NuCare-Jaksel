import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import ZakatPage from "@/components/dashboard/Zakat/ZakatPage";

const DashboardZakat = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Zakat" />
            <ZakatPage />
        </DefaultLayout>
    );
};

export default DashboardZakat;
