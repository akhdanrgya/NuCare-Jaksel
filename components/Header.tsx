"use client"
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 px-40 py-6">
        <a className="text-xl font-bold" href="/">NU CARE JAKARTA SELATAN</a>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-green-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-green-500">Donasi</a>
          <a href="#" className="text-gray-700 hover:text-green-500">Tentang</a>
          <a href="/dashboard" className="text-gray-700 hover:text-green-500">Dashboard</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
