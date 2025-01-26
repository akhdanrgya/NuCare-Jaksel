import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeritaPage from "@/components/dashboard/Berita";

const Berita = () => {
    return (
        <>
            <Header />
            <div className="mt-24">
                <BeritaPage detail={true} />
            </div>
            <Footer />
        </>
    )
}

export default Berita