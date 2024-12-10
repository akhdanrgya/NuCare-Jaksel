const Stats: React.FC = () => {
    const stats = [
      { value: "53.314.706", label: "Penerima Manfaat", icon: "/path/to/icon1.svg" },
      { value: "Rp. 2.825.589.123.623,-", label: "Penghimpunan", icon: "/path/to/icon2.svg" },
      { value: "Rp. 2.792.571.002.035,-", label: "Penyaluran", icon: "/path/to/icon3.svg" },
      { value: "615.343", label: "Donatur", icon: "/path/to/icon4.svg" },
    ];
  
    return (
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-11/12 bg-white shadow-lg rounded-xl p-6 flex justify-around items-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center flex flex-col items-center w-1/4"
          >
            <img
              src={stat.icon}
              alt={stat.label}
              className="w-12 h-12 mb-2"
            />
            <p className="text-lg font-semibold text-green-600">{stat.value}</p>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Stats;
  