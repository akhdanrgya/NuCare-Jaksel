import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import Profile from "@/components/Profile";
import Stats from "@/components/Stats";
import DonasiPage from "@/components/dashboard/Donasi/DonasiPage";
import BeritaPage from "@/components/dashboard/Berita";


const Home: React.FC = () => {
    return (
        <>
            <Analytics />

            <Header />
            <div className="mt-20">
                <Hero />
                <Stats />
                <div className="mt-24">
                    <DonasiPage />
                    <div className="bg-gray-500">
                        <BeritaPage />
                    </div>
                    <Profile />
                </div>
            </div>

            <Footer />

        </>
    );
};

export default Home;
