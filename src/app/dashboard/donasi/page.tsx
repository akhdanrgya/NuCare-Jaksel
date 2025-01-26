import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import DonasiPage from "@/components/dashboard/Donasi/DonasiPage";

const DashboardDonasi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Donasi" />
      <DonasiPage dashboard={true} />
    </DefaultLayout>
  );
};

export default DashboardDonasi;
