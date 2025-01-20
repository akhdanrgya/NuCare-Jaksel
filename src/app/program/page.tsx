'use client'
import Header from "@/components/Header";
import DonasiCards from "@/components/DonasiCard";

const program = () => {
    return (
        <>
            <Header/>
            <DonasiCards dashboard={false}/>
        </>
    )
}

export default program