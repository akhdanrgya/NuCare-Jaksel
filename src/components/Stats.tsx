'use client'
import { useState, useEffect } from "react";
import { fetchStats, StatsType } from "../data/stat";
import { Montserrat } from "next/font/google";
import { formatRupiahWithoutRpStats } from "@/utils/formatRupiah";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const Stats: React.FC = () => {
  const [stats, setStats] = useState<StatsType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStats();
      setStats(data);
    };
    fetchData();
  }, []);

  return (
      <div
          className={`${montserrat.variable} font-montserrat bg-white shadow-lg rounded-xl p-6 flex flex-wrap justify-around items-center w-11/12 mx-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:z-10`}
      >
        {stats.map((stat, index) => (
            <div
                key={index}
                className="text-center flex flex-col items-center w-full sm:w-1/2 md:w-1/4 mb-4 md:mb-0"
            >
              <img src={stat.icon} alt={stat.label} className="w-12 h-12 mb-2" />
              <p className="text-lg font-semibold text-green-500">
                {formatRupiahWithoutRpStats(stat.value)}
              </p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
        ))}
      </div>
  );
};

export default Stats;