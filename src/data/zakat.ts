export const zakatMaal = (wealth : number): number => {
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