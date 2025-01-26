import BeritaDetails from "@/components/BeritaDetails"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BeritaDetail = () => {
    return (
        <>
            <Header/>
            <div className="pt-24">
                <BeritaDetails/>
            </div>
            <Footer/>
        </>
    )
}

export default BeritaDetail