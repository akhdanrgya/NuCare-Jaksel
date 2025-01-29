import DefaultLayout from "@/components/dashboard/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GaleryPage from "@/components/dashboard/Galery";
import React from "react";

const Galery = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Galery" />
            <GaleryPage/>
        </DefaultLayout>
    )
}

export default Galery