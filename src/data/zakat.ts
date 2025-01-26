const emas = 1611000;
const perak = 15909;

export const zakatMaal = (wealth: number): number => {
    const hasil = wealth * 0.025
    return hasil
}

export const zakatPertanian = (
    hasilPadi: number = 0,
    hasilLainnya: number = 0,
    hasilTernak: number = 0,
    hutang: number = 0
): number => {
    const nisabPadi = 520;
    const nisabTernak = 5;

    const zakatPadi = hasilPadi >= nisabPadi ? hasilPadi * 0.1 : 0;
    const zakatLainnya = hasilLainnya * 0.025;
    const zakatTernak = hasilTernak >= nisabTernak ? hasilTernak * 0.025 : 0;

    const totalZakat = zakatPadi + zakatLainnya + zakatTernak - hutang;

    if (totalZakat <= 0) {
        return 0;
    }

    return totalZakat;
};

export const zakatSimpanan = (tipe: string, value: number, tanggalDiperoleh: Date) => {
    let zakat;
    const today = new Date();
    const satuTahunKemudian = new Date(
        tanggalDiperoleh.getFullYear() + 1, // Tambahkan 1 tahun ke tanggal diperoleh
        tanggalDiperoleh.getMonth(),
        tanggalDiperoleh.getDate()
    );

    if (today >= satuTahunKemudian) {
        if (tipe.toLowerCase() === "emas") {
            if (value >= 85) {
                zakat = value * emas * 0.025
            }
            return 0
        }
        else if (tipe.toLowerCase() === "perak") {
            if (value >= 595) {
                zakat = value * perak * 0.025
            }
            return 0
        }
        else if (tipe.toLowerCase() === "uang") {
            if (value >= 85 * emas) {
                zakat = value * 0.025
                return zakat
            }
            return 0
        }
    }

    return 0;

}

export const zakatUpah = (periode: string, value: number) => {
    if (periode.toLowerCase() === "tahun") {
        if (value >= 85 * emas) {
            return value * 0.025
        }
        return 0
    }

    else if (periode.toLowerCase() === "bulan") {
        if (value * 12 >= 85 * emas) {
            return value * 0.025
        }
    }
    return 0
}