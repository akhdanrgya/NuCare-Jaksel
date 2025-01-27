'use client'
import Header from "@/components/Header";
import DonasiPage from "@/components/dashboard/Donasi/DonasiPage";
import Footer from "@/components/Footer";

const program = () => {
    return (
        <>
            <Header />
            <div className="mt-24">
            <DonasiPage dashboard={false}  detail={true}/>
            </div>
            <Footer/>
        </>
    )
}

export default program