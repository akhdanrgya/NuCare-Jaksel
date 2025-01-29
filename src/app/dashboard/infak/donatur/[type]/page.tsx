import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import InfakUserPage from "@/components/dashboard/Infak/InfakUserPage";

const DashboardInfak = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Infak" />
            <InfakUserPage />
        </DefaultLayout>
    );
};

export default DashboardInfak;
