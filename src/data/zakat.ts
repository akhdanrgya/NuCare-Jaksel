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

export const zakatSimpanan = (
    totalEmas: number = 0,
    totalPerak: number = 0,
    totalUang: number = 0,
    totalHutang: number = 0,

) => {
    let zakat = 0;


    if (totalEmas > 0) {
        if (totalEmas >= 85) {
            zakat += (totalEmas * emas * 0.025)
        }
    }
    else if (totalPerak > 0) {
        if (totalPerak >= 595) {
            zakat += (totalPerak * perak * 0.025)
        }
    }
    else if (totalUang > 0) {
        if (totalUang >= 85 * emas) {
            zakat += totalUang * 0.025
        }
    }
    else if (totalHutang > 0) {
        zakat -= totalHutang
    }

    return zakat;

}

export const zakatProfesi = (value: number) => {

    if (value * 12 >= 85 * emas) {
        return value * 0.025
    }
    return 0;

}

export const zakatSuratBerharga = (value: number) => {
    if (value >= 85 * emas) {
        return value * 0.025
    }
    return 0
}

export const zakatRikaz = (value: number) => {
    return value * 0.2
}