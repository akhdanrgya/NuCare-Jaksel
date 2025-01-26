import { fetchDonationById, fetchDonationByTitle } from "@/data/donations";
import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';


const SearchForm: React.FC<{ header?: boolean; search?: string; onSearch: (query: string) => void }> = ({ header = true, search = "", onSearch }) => {


    const [query, setQuery] = useState<string>("");
    const [donationData, setDonationData] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [debouncedValue] = useDebounce(query, 1000)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {




    };

    useEffect(() => {
        if (typeof onSearch === "function") {
            console.log(query)
            onSearch(debouncedValue); // Pastikan onSearch adalah fungsi sebelum memanggilnya
        }
    }, [debouncedValue]);


    return (
        <>
            {header ? (
                <li className="hidden lg:block">
                    <form onSubmit={handleSubmit}>
                        <div className="relative w-full max-w-[300px]">
                            <button
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-primary dark:text-dark-6 dark:hover:text-primary"
                                title="profile">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1791_1693)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                                            fill=""
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1791_1693">
                                            <rect width="18" height="18" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)} // Update state saat input berubah
                                className="w-full rounded-full border border-stroke bg-gray-2 py-3 pl-13.5 pr-5 text-dark focus:border-primary focus:outline-none dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus:border-primary xl:w-[300px]"
                            />
                        </div>
                    </form>
                </li>
            ) : (

                <li className="hidden lg:block">
                    <form onSubmit={handleSubmit}>
                        <div className="relative w-full max-w-[300px]">
                            <button
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-dark hover:text-green-500 dark:text-dark-6 dark:hover:text-green-500"
                                title="profile">
                                <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1791_1693)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.625 2.0625C5.00063 2.0625 2.0625 5.00063 2.0625 8.625C2.0625 12.2494 5.00063 15.1875 8.625 15.1875C12.2494 15.1875 15.1875 12.2494 15.1875 8.625C15.1875 5.00063 12.2494 2.0625 8.625 2.0625ZM0.9375 8.625C0.9375 4.37931 4.37931 0.9375 8.625 0.9375C12.8707 0.9375 16.3125 4.37931 16.3125 8.625C16.3125 10.5454 15.6083 12.3013 14.4441 13.6487L16.8977 16.1023C17.1174 16.3219 17.1174 16.6781 16.8977 16.8977C16.6781 17.1174 16.3219 17.1174 16.1023 16.8977L13.6487 14.4441C12.3013 15.6083 10.5454 16.3125 8.625 16.3125C4.37931 16.3125 0.9375 12.8707 0.9375 8.625Z"
                                            fill=""
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1791_1693">
                                            <rect width="18" height="18" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>

                            <input
                                type="text"
                                placeholder={`Search ${search}`}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)} // Update state saat input berubah
                                className="w-full rounded-full border border-stroke bg-white py-3 pl-13.5 pr-5 text-dark focus:border-green-500 focus:outline-none dark:focus:border-green-500 xl:w-[400px]"
                            />

                        </div>
                    </form>
                </li>
            )}
        </>
    );
};

export default SearchForm;
