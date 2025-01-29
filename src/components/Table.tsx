import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { fetchDonaturZakat, DonaturZakatType } from "@/data/donaturZakat";

interface TableProps {
    columns: { accessorKey: string; header: string }[];
    data: DonaturZakatType[];
}

const Table = ({ columns, data }: TableProps) => {
    const [tableData, setTableData] = useState<DonaturZakatType[]>(data);

    // Tambahkan kolom index ke dalam data
    // jadi setiap ada accessorKey yang namanya index itu bakal jadi index data
    useEffect(() => {
        const dataWithIndex = data.map((item, index) => ({
            ...item,
            index: index + 1,
        }));
        setTableData(dataWithIndex);
    }, [data]);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(tableData.length / 10),
    });

    if (!data || data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <section className="bg-white p-6 w-full rounded-md shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-left p-4">
                    <thead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-300 px-6 py-3">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-300 px-6 py-3">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination controls */}
            <div className="mt-4 flex gap-4 items-center">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                >
                    {"<"}
                </button>

                {/* Page numbers */}
                <div className="flex gap-2">
                    {Array.from({ length: table.getPageCount() }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => table.setPageIndex(index)}
                            className={`px-4 py-2 ${table.getState().pagination.pageIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded cursor-pointer`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                >
                    {">"}
                </button>

                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} | Showing{" "}
                    {table.getRowModel().rows.length} of {data.length} entries
                </span>
            </div>
        </section>
    );
};

export default Table;
