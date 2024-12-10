type Donasi = {
    title: string;
    description: string;
  };
  
  const donations: Donasi[] = [
    { title: "Bantu Pendidikan", description: "Support anak-anak untuk sekolah." },
    { title: "Bencana Alam", description: "Bantu korban bencana." },
  ];
  
  const DonasiCards: React.FC = () => {
    return (
      <section className="py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donasi, idx) => (
            <div key={idx} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{donasi.title}</h3>
              <p className="text-gray-700">{donasi.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default DonasiCards;
  