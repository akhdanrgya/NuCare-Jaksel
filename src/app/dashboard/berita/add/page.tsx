import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormBerita from "@/components/dashboard/Berita/FormBerita";

const AddBerita = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Berita" />
            <FormBerita />
        </DefaultLayout>
    )
}

export default AddBerita;