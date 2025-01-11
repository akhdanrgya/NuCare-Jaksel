import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Berita from "@/components/dashboard/Berita";

const DashboardBerita = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Berita" />
      <Berita/>
    </DefaultLayout>
  );
};

export default DashboardBerita;
