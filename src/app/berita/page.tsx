import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeritaCard from "@/components/BeritaCard";

const Berita = () => {
    return (
        <>
            <Header/>
            <div className="mt-24">
                <BeritaCard detail={true}/>
            </div>
            <Footer/>
        </>
    )
}

export default Berita