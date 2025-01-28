"use client";

import { useState, useEffect } from "react";
import InputGroup from "./FormElements/InputGroup";
import { useRouter } from "next/navigation";
import {
    zakatMaal,
    zakatPertanian,
    zakatSimpanan,
    zakatProfesi,
    zakatRikaz,
    zakatSuratBerharga,
    fetchZakat,
    ZakatType
} from "@/data/zakat";
import { formatRupiah } from "@/utils/formatRupiah";
import { fetchInfak, InfakType } from "@/data/infak";
import { fetchWakaf, WakafType } from "@/data/wakaf";

const HeaderCard: React.FC = () => {
    const [donationType, setDonationType] = useState<string>("zakat");
    const [wealth, setWealth] = useState<number>(0);
    const [calculatedZakat, setCalculatedZakat] = useState<number>(0);
    const [farmYield, setFarmYield] = useState<number>(0);
    const [otherIncome, setOtherIncome] = useState<number>(0);
    const [livestock, setLivestock] = useState<number>(0);
    const [debt, setDebt] = useState<number>(0);
    const [emas, setEmas] = useState<number>(0);
    const [perak, setPerak] = useState<number>(0);
    const router = useRouter();

    // data zakat
    const [zakat, setZakat] = useState<ZakatType[]>([]);
    const [zakatType, setZakatType] = useState<number>(1);


    // data infak
    const [Infak, setInfak] = useState<InfakType[]>([]);
    const [InfakId, setInfakId] = useState<number>(1);

    // data wakaf
    const [Wakaf, setWakaf] = useState<WakafType[]>([])
    const [WakafId, setWakafId] = useState<number>(1)

    useEffect(() => {
        const fetchZakatData = async () => {
            const data = await fetchZakat();
            if (data) setZakat(data);
        }
        const fetchInfakData = async () => {
            const data = await fetchInfak()
            if (data) setInfak(data);
        }

        const fetchWakafData = async () => {
            const data = await fetchWakaf()
            if (data) { setWakaf(data) }
        }

        fetchInfakData()
        fetchZakatData()
        fetchWakafData()
    }, []);

    const handleDonationTypeChange = (type: string) => {
        setDonationType(type);
    };

    const handleZakatTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setZakatType(parseInt(e.target.value));
    };

    const handleInfakIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInfakId(parseInt(e.target.value));
    };

    const handleWakafIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setWakafId(parseInt(e.target.value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const value = parseInt(e.target.value) || 0;
        if (field === "wealth") setWealth(value);
        if (field === "farmYield") setFarmYield(value);
        if (field === "otherIncome") setOtherIncome(value);
        if (field === "livestock") setLivestock(value);
        if (field === "debt") setDebt(value);
        if (field === "emas") setEmas(value);
        if (field === "perak") setPerak(value);
    };

    useEffect(() => {
        if (donationType === "zakat") {
            const zakatCalculators: Record<string, () => number> = {
                1: () => zakatMaal(wealth),
                2: () => zakatPertanian(farmYield, otherIncome, livestock, debt),
                3: () => zakatSimpanan(emas, perak, wealth, debt),
                4: () => zakatProfesi(wealth),
                5: () => zakatRikaz(wealth),
                6: () => wealth,
            };

            const calculate = zakatCalculators[zakatType];
            if (calculate) {
                setCalculatedZakat(calculate());
            }
        }
    }, [wealth, donationType, zakatType, farmYield, otherIncome, livestock, debt, emas, perak]);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (donationType === "zakat") {
            const query = new URLSearchParams({
                wealth: donationType === "zakat" ? calculatedZakat.toString() : wealth.toString(),
                zakatType: zakatType.toString()
            }).toString();

            router.push(`/payment?${query}`);

        } else if (donationType === "infak") {
            const query = new URLSearchParams({
                wealth: wealth.toString(),
                infakTitle: InfakId.toString()
            }).toString();

            router.push(`/payment?${query}`);
        }
        else if (donationType === "wakaf") {
            const query = new URLSearchParams({
                wealth: wealth.toString(),
                wakafId: WakafId.toString()
            }).toString();

            router.push(`/payment?${query}`);
        }
    };


    return (
        <div
            className="absolute top-1/5 right-0 m-4 bg-white p-8 rounded-lg shadow-xl z-20 w-100 max-h-[500px] overflow-y-auto">
            <form onSubmit={handleSubmit}>
                {/* Pilihan Donasi dengan tombol */}
                <div className="mb-4 flex justify-between">
                    <button
                        type="button"
                        className={`w-24 py-2 rounded-lg mx-2 ${donationType === "zakat"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => handleDonationTypeChange("zakat")}
                    >
                        Zakat
                    </button>
                    <button
                        type="button"
                        className={`w-24 py-2 rounded-lg mx-2 ${donationType === "infak"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => handleDonationTypeChange("infak")}
                    >
                        Infak
                    </button>
                    <button
                        type="button"
                        className={`w-24 py-2 rounded-lg mx-2 ${donationType === "wakaf"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => handleDonationTypeChange("wakaf")}
                    >
                        Wakaf
                    </button>
                </div>

                {/* Form Dinamis berdasarkan pilihan Donasi */}
                {donationType === "zakat" && (
                    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                Ayo hitung zakat kamu !
                            </h2>
                            <p className="text-center text-gray-600 mb-4">
                                Pilih jenis zakat dan masukkan jumlah yang sesuai.
                            </p>
                        </div>

                        <div className="mb-4">
                            <select
                                id="zakatType"
                                value={zakatType}
                                onChange={handleZakatTypeChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                            >

                                {zakat.map((data, idx) => (
                                    <option key={idx} value={data.id}>Zakat {data.title}</option>
                                ))}
                            </select>

                            <p className="text-gray-600 my-4">
                                Coba masukkan jumlah hartamu dan kalkulator kami akan menghitung jumlah zakatnya.
                            </p>

                        </div>

                        {zakatType === 1 && (
                            <div className="mb-4">
                                <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                    Kekayaan (1 tahun)
                                </label>
                                <InputGroup
                                    id="wealth"
                                    type="number"
                                    placeholder="Masukkan jumlah kekayaan"
                                    customClasses=""
                                    value={String(wealth)}
                                    onChange={(e) => handleInputChange(e, "wealth")}
                                    classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                />
                            </div>
                        )}
                        {zakatType === 4 && (
                            <div className="mb-4">
                                <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                    Gaji per bulan
                                </label>
                                <InputGroup
                                    id="wealth"
                                    type="number"
                                    placeholder="Masukkan gaji perbulan"
                                    customClasses=""
                                    value={String(wealth)}
                                    onChange={(e) => handleInputChange(e, "wealth")}
                                    classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                />
                            </div>
                        )}
                        {zakatType === 5 && (
                            <div className="mb-4">
                                <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                    Nominal Zakat Rikaz
                                </label>
                                <InputGroup
                                    id="wealth"
                                    type="number"
                                    placeholder="Masukkan nominal zakat rikaz"
                                    customClasses=""
                                    value={String(wealth)}
                                    onChange={(e) => handleInputChange(e, "wealth")}
                                    classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                />
                            </div>
                        )}
                        {zakatType === 6 && (
                            <div className="mb-4">
                                <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                    Nominal Uang atau Surat berharga Lainnya
                                </label>
                                <InputGroup
                                    id="wealth"
                                    type="number"
                                    placeholder="Masukkan nominal zakat rikaz"
                                    customClasses=""
                                    value={String(wealth)}
                                    onChange={(e) => handleInputChange(e, "wealth")}
                                    classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                />
                            </div>
                        )}

                        {zakatType === 2 && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="farmYield" className="block text-gray-700 mb-2">
                                        Hasil Panen
                                    </label>
                                    <InputGroup
                                        id="farmYield"
                                        type="number"
                                        placeholder="Masukkan hasil panen"
                                        customClasses=""
                                        value={String(farmYield)}
                                        onChange={(e) => handleInputChange(e, "farmYield")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="otherIncome" className="block text-gray-700 mb-2">
                                        Pendapatan Lainnya
                                    </label>
                                    <InputGroup
                                        id="otherIncome"
                                        type="number"
                                        placeholder="Masukkan pendapatan lainnya"
                                        customClasses=""
                                        value={String(otherIncome)}
                                        onChange={(e) => handleInputChange(e, "otherIncome")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="livestock" className="block text-gray-700 mb-2">
                                        Jumlah Ternak
                                    </label>
                                    <InputGroup
                                        id="livestock"
                                        type="number"
                                        placeholder="Masukkan jumlah ternak"
                                        customClasses=""
                                        value={String(livestock)}
                                        onChange={(e) => handleInputChange(e, "livestock")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="debt" className="block text-gray-700 mb-2">
                                        Hutang
                                    </label>
                                    <InputGroup
                                        id="debt"
                                        type="number"
                                        placeholder="Masukkan jumlah hutang"
                                        customClasses=""
                                        value={String(debt)}
                                        onChange={(e) => handleInputChange(e, "debt")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                            </>
                        )}

                        {zakatType === 3 && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="emas" className="block text-gray-700 mb-2">
                                        Emas
                                    </label>
                                    <InputGroup
                                        id="emas"
                                        type="number"
                                        placeholder="Masukkan Jumlah emas"
                                        customClasses=""
                                        value={String(emas)}
                                        onChange={(e) => handleInputChange(e, "emas")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="perak" className="block text-gray-700 mb-2">
                                        Perak
                                    </label>
                                    <InputGroup
                                        id="perak"
                                        type="number"
                                        placeholder="Masukkan Jumlah perak"
                                        customClasses=""
                                        value={String(perak)}
                                        onChange={(e) => handleInputChange(e, "perak")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                        Uang
                                    </label>
                                    <InputGroup
                                        id="wealth"
                                        type="number"
                                        placeholder="Masukkan jumlah ternak"
                                        customClasses=""
                                        value={String(wealth)}
                                        onChange={(e) => handleInputChange(e, "wealth")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="debt" className="block text-gray-700 mb-2">
                                        Hutang
                                    </label>
                                    <InputGroup
                                        id="debt"
                                        type="number"
                                        placeholder="Masukkan jumlah hutang"
                                        customClasses=""
                                        value={String(debt)}
                                        onChange={(e) => handleInputChange(e, "debt")}
                                        classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                                    />
                                </div>
                            </>
                        )}

                        <div className="text-center mb-6">
                            <p className="text-lg font-semibold text-gray-800">
                                Total Zakat: {formatRupiah(calculatedZakat)}
                            </p>
                        </div>

                        <div className="text-center">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                                Bayar Zakat
                            </button>
                        </div>
                    </div>
                )}

                {donationType === "infak" && (
                    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                Ayo mulai infak
                            </h2>
                            <p className="text-center text-gray-600 mb-4">
                                Silakan isi jumlah infakmu. Insya Allah berkah.
                            </p>
                        </div>

                        <div className="mb-4">
                            <select
                                id="zakatType"
                                value={InfakId}
                                onChange={handleInfakIdChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                            >

                                {Infak.map((data, idx) => (
                                    <option key={idx} value={data.id}>{data.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                Nominal infak
                            </label>
                            <InputGroup
                                id="wealth"
                                type="number"
                                placeholder="Masukkan jumlah kekayaan"
                                customClasses=""
                                value={String(wealth)}
                                onChange={(e) => handleInputChange(e, "wealth")}
                                classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                            />
                        </div>

                        <div className="text-center">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                                Infak sekarang
                            </button>
                        </div>
                    </div>
                )}

                {donationType === "wakaf" && (
                    <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-center text-gray-800">
                                Ayo mulai wakaf
                            </h2>
                            <p className="text-center text-gray-600 mb-4">
                                Mari wakaf tunai bersama kami!
                            </p>
                        </div>

                        <div className="mb-4">
                            <select
                                id="zakatType"
                                value={WakafId}
                                onChange={handleWakafIdChange}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                            >

                                {Wakaf.map((data, idx) => (
                                    <option key={idx} value={data.id}>{data.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="wealth" className="block text-gray-700 mb-2">
                                Nominal Wakaf
                            </label>
                            <InputGroup
                                id="wealth"
                                type="number"
                                placeholder="Masukkan jumlah kekayaan"
                                customClasses=""
                                value={String(wealth)}
                                onChange={(e) => handleInputChange(e, "wealth")}
                                classInput="w-full p-3 border border-gray-300 rounded-lg shadow-sm text-black"
                            />
                        </div>

                        <div className="text-center">
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600">
                                Wakaf sekarang
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default HeaderCard;
