export type Donasi = {
    title: string;
    description: string;
    location: string;
    collected: number;
    daysLeft: number;
  };
  
  export const donations: Donasi[] = [
    {
      title: "#PrayForSukabumi NU CARE x KOPRI PB PMII",
      description: "Mari bantu warga terdampak bencana di Sukabumi.",
      location: "Kabupaten Sukabumi",
      collected: 495000,
      daysLeft: 61,
    },
    {
      title: "Mari Ikut Bangun Sekolah Dasar Qur'ani di Lebak, Banten!",
      description:
        "Bantu umat muslim di Banten membangun sekolah dasar Qur'an.",
      location: "Kabupaten Lebak",
      collected: 1975000,
      daysLeft: 155,
    },
    {
      title: "Wujudkan Alat Bantu untuk Pak Sutarja dan 29 Difabel Lainnya!",
      description:
        "Mari bantu Pak Sutarja dan teman-teman difabel lainnya mendapatkan alat bantu.",
      location: "Kota Jakarta Pusat",
      collected: 1280000,
      daysLeft: 155,
    },
  ];
  