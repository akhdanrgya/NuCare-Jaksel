'use client'
import { useState, useEffect } from "react";
import { fetchStats, StatsType } from "../data/stat";

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
  