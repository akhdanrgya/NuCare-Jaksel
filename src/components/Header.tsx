"use client"
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <header className={`${montserrat.variable} font-montserrat bg-white shadow-lg fixed top-0 left-0 w-full z-50`}>
        <div className="container mx-auto flex justify-between items-center p-4 px-6 md:px-40 py-6 relative">
          <div>
            <a href="/">
              <Image src="/images/logo/logoNUCare.png" width={1920} height={1080} className="h-10 w-auto" alt="Logo" />
            </a>
          </div>

          {/* Hamburger Button */}
          <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Menu */}
          <nav
              className={`absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${
                  isOpen ? "flex" : "hidden"
              } md:flex`}
          >
            <a href="/" className="text-gray-700 hover:text-green-500 py-2 md:py-0">Home</a>
            <a href="/program" className="text-gray-700 hover:text-green-500 py-2 md:py-0">Program</a>
            <a href="/berita" className="text-gray-700 hover:text-green-500 py-2 md:py-0">Berita</a>
            <a href="/dashboard" className="text-gray-700 hover:text-green-500 py-2 md:py-0">Dashboard</a>
          </nav>
        </div>
      </header>
  );
};

export default Header;