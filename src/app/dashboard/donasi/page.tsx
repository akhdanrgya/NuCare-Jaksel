import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Donasi from "@/components/dashboard/Donasi";
import DonasiPage from "@/components/dashboard/Donasi/Card";

const DashboardDonasi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Donasi" />
      <DonasiPage />
    </DefaultLayout>
  );
};

export default DashboardDonasi;
