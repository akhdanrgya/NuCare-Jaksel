import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Berita from "@/components/dashboard/Berita";
import BeritaCard from "@/components/BeritaCard";

const DashboardBerita = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Berita" />
      {/*<Berita />*/}
      <BeritaCard dashboard={true} />
    </DefaultLayout>
  );
};

export default DashboardBerita;
