import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeritaPage from "@/components/dashboard/Berita";

const Berita = () => {
    return (
        <>
            <Header />
            <BeritaPage detail={true} />
            <Footer />
        </>
    )
}

export default Berita