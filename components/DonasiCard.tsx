import { donations } from "../data/donations";
  
const DonasiCards: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold">Ayo Mulai Berdonasi!</h2>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donasi, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              {donasi.title}
            </h3>
            <p className="text-gray-700 mb-2">{donasi.description}</p>
            <p className="text-gray-500 text-sm mb-4">
              📍 {donasi.location}
            </p>
            <p className="text-gray-700 font-bold">
              Terkumpul: Rp {donasi.collected.toLocaleString("id-ID")}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              ⏳ {donasi.daysLeft} Hari lagi
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Ikut Donasi
            </button>
          </div>
        ))}
      </div>
      <div className="container mx-auto text-center mt-8">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
          Program Lainnya
        </button>
      </div>
    </section>
  );
};
  
  export default DonasiCards;
  