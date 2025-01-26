'use client'
import Header from "@/components/Header";
import DonasiPage from "@/components/dashboard/Donasi/DonasiPage";

const program = () => {
    return (
        <>
            <Header />
            <DonasiPage dashboard={false} />
        </>
    )
}

export default program