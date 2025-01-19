import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormBerita from "@/components/dashboard/Berita/FormBerita";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";

const AddDonasi = () => {
    return(
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Berita" />
            <FormBerita />
        </DefaultLayout>
    )
}

export default AddDonasi;