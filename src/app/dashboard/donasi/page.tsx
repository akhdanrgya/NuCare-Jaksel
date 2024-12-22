import DefaultLayout from "../../../../components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "../../../../components/Breadcrumbs/Breadcrumb";
import Donasi from "../../../../components/dashboard/Donasi";

const DashboardDonasi = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Donasi" />
      <Donasi />
    </DefaultLayout>
  );
};

export default DashboardDonasi;
