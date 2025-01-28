import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import WakafPage from "@/components/dashboard/Wakaf/WakafPage";

const DashboardWakaf = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Wakaf" />
            <WakafPage />
        </DefaultLayout>
    );
};

export default DashboardWakaf;
