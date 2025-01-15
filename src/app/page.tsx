import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DonasiCards from "@/components/DonasiCard";
import Footer from "@/components/Footer";
import BeritaCard from "@/components/BeritaCard";
import {Analytics} from "@vercel/analytics/react"

const Home: React.FC = () => {
    return (
        <>
            <Analytics/>
            <Header/>
            <Hero/>
            <DonasiCards/>
            <BeritaCard/>
            <Footer/>

        </>
    );
};

export default Home;
