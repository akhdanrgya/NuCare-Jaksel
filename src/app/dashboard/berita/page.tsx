import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const DashboardBerita = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Berita" />
      <div>Dashboard Berita</div>
    </DefaultLayout>
  );
};

export default DashboardBerita;
