import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Donasi from "@/components/dashboard/Donasi/FormDonasi";
import DonasiPage from "@/components/dashboard/Donasi/DonasiPage";

const DashboardDonasi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Donasi" />
      <DonasiPage />
    </DefaultLayout>
  );
};

export default DashboardDonasi;
