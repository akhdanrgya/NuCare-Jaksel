import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeritaCard from "@/components/BeritaCard";

const Berita = () => {
    return (
        <>
            <Header/>
            <BeritaCard detail={true}/>
            <Footer/>
        </>
    )
}

export default Berita