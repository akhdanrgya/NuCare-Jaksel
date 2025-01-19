import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import FormDonasi from "@/components/dashboard/Donasi/FormDonasi";
import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";

const AddDonasi = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Tambah Donasi" />
            <FormDonasi />
        </DefaultLayout>
    )
}

export default AddDonasi;