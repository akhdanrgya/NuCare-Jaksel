import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React from "react";
import DonasiCard from "@/components/DonasiCard";

const DashboardDonasi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Donasi" />
      <DonasiCard dashboard={true} />
    </DefaultLayout>
  );
};

export default DashboardDonasi;
