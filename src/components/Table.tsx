import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import Link from "next/link";

interface TableProps<T extends object> {
    columns: { accessorKey: keyof T; header: string }[];
    data: T[];
    source?: string;
}

export interface BaseData {
    id: number;
}

const Table = <T extends BaseData>({ columns, data, source }: TableProps<T>) => {
    const [tableData, setTableData] = useState<T[]>(data);
    const [tableColumns, setTableColumns] = useState(columns);

    // Add index to data
    useEffect(() => {
        const dataWithIndex = data.map((item) => {
            return {
                ...item,
                index: 0, // or however you want to set the index
            };
        });
        setTableData(dataWithIndex as T[]);
    }, [data]);

    // Add "Edit" column if source is "wakaf" or "infak"
    useEffect(() => {
        if (source === "wakaf" || source === "infak") {
            const updatedColumns = [...columns, { accessorKey: "edit" as keyof T, header: "Edit" }];
            setTableColumns(updatedColumns);
        } else {
            setTableColumns(columns);
        }
    }, [source, columns]);

    const table = useReactTable({
        data: tableData,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(tableData.length / 10),
    });

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
                                    {cell.column.id === "edit" ? (
                                        <Link href={`/dashboard/infak/donatur/${row.original.id}`}>
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
                                                Edit
                                            </button>
                                        </Link>
                                    ) : (
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    )}
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
