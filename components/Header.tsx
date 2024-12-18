"use client"
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">NU CARE JAKARTA SELATAN</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-green-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-green-500">Donasi</a>
          <a href="#" className="text-gray-700 hover:text-green-500">Tentang</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
