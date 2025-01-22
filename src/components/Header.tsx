"use client"
import {Montserrat} from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});


const Header: React.FC = () => {
  return (
    <header className={`${montserrat.variable} font-montserrat bg-white shadow-md`}>
      <div className="container mx-auto flex justify-between items-center p-4 px-40 py-6">
        <div>
          <a><img src="/images/logo/logoNUCare.png" className="h-10 w-auto" alt="" /></a>
        </div>
        <nav className="space-x-4">
          <a href="/" className="text-gray-700 hover:text-green-500">Home</a>
          <a href="/program" className="text-gray-700 hover:text-green-500">Program</a>
          <a href="/berita" className="text-gray-700 hover:text-green-500">Berita</a>
          <a href="/dashboard" className="text-gray-700 hover:text-green-500">Dashboard</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
