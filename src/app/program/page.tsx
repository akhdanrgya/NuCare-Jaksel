'use client'
import Header from "@/components/Header";
import DonasiCards from "@/components/DonasiCard";
import Footer from "@/components/Footer";

const program = () => {
    return (
        <>
            <Header/>
            <div className="mt-24">
            <DonasiCards dashboard={false} detail={true}/>
            </div>
            <Footer/>
        </>
    )
}

export default program