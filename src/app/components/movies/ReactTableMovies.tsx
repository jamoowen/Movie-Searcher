'use client'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable,
    PaginationState,
    getPaginationRowModel,
    getSortedRowModel,

} from "@tanstack/react-table";
import React, { useState } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { AiOutlineCheck } from 'react-icons/ai'



type Movies = Database['public']['Tables']['movies']['Row'];

const ReactTableMovies = ({ data, session }: { data: Movies[], session: Session | null }) => {
    const user = session?.user;
    const supabase = createClientComponentClient<Database>();
    // const { user } = supabase.auth.getUser();

    /* 
    ---------------Table DEF
    */

    const movieData = data;

    type Movies = {
        averageRating: number;
        cast: string;
        castNconst: string;
        dirconst: string;
        director: string;
        genres: string;
        primaryTitle: string;
        runtimeMinutes: number;
        startYear: number;
        tconst: string;
    }

    const columnHelper = createColumnHelper<Movies>();
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = [
        columnHelper.accessor("primaryTitle", {
            header: "Title",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("startYear", {
            header: "Release Year",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("director", {
            header: "Director",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("averageRating", {
            header: "IMDB Rating",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("cast", {
            header: "Cast",

            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("runtimeMinutes", {
            header: "Runtime (mins)",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("genres", {
            header: "Genres",
            cell: (info) => info.getValue(),
        }),

        columnHelper.accessor("dirconst", {
            header: "dirconst",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("castNconst", {
            header: "castNconst",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("tconst", {
            header: "tconst",
            cell: (info) => info.getValue(),
        }),

    ]

    const columnVisibility = {}

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        initialState: {
            pagination: {
                pageSize: 20,
            },
            columnSizing: {
                "primaryTitle": 100,
                "startYear": 20,
                "director": 100,
                "averageRating": 20,
                "cast": 150,
                "runtimeMinutes": 20,
                "genres": 80,
                "dirconst": 10,
                "tconst": 10,
                "castNconst": 10

            },
            columnVisibility: {
                castNconst: false,
                tconst: false,
                dirconst: false,
            },
        },
    });

    /* 
    ----------------END TABLE DEF
    */


    const [selected, setSelected] = useState<string | null>(null);
    const [selectedRow, setSelectedRow] = useState<{} | null >(null);
    const [popupVis, setPopupVis] = useState(false);
    const [addButton, setAddButton] = useState(true);

    type MovieRow = Database['public']['Tables']['movies']['Row'];

    const handleRowClick = (row: MovieRow) => {
        // tconst is also the id of the row
        setAddButton(true);
        setPopupVis(true);

        setSelected(row['primaryTitle'])
        setSelectedRow(row);

    }

    const handleAdd = async () => {

        if (user && selectedRow) {
            console.log('adding to watchlist: ', selected)
            var user_id = { user_id: user.id };
            type rowData ={[key: string]: any};
            var rowData: rowData = selectedRow;
            rowData.user_id = user.id;
            // const tester = { user_id: user?.id, primaryTitle: 'be', director: 'ye', cast: 'ss', tconst: 'tconst', dirconst: 'dirconst', castNconst: 'castNconst', runtimeMinutes: 98, averageRating: 8, genres: 'us, js' }

            // rowData['user_id'] = user?.id;
            console.log(`data: ${rowData.user_id}`)
            try {
                await supabase
                    .from('watchlist')
                    .upsert(rowData)
                    .select()
            } catch (error) {
                alert('error adding to watchlist', error)
            }


            finally {
                setAddButton(false)
                setTimeout(() => setPopupVis(false), 5000)
            }

        }

    }

    return (
        <>
            {popupVis &&
                <div id="popup" className="fixed bg-white top-[1%] left-[1%]  w-screen h-screen bg-opacity-75 poin text-black">
                    <ClickAwayListener onClickAway={() => setPopupVis(false)}>
                        <div className={`fixed mx-auto my-auto w-64 h-auto py-1 px-2 rounded-sm border border-orange-400 bg-white gap-2 text-black text-sm left-[15%] top-[40%]`}>
                            <span className="text-bold text-black text-xl">{selected} <br /></span>
                            <div className="flex flex-row">
                                {addButton ?
                                    <button onClick={handleAdd} className=" px-1 ml-2 w-12 bg-orange-400 rounded-md border-white border text-black">Add</button>
                                    : <> <div className="bg-green-400 ml-2 mr-2 px-1 py-1 w-8 items-center"><AiOutlineCheck /> </div>added</>
                                }
                            </div>
                        </div>

                    </ClickAwayListener>
                </div>
            }


            <div className="w-full  mx-auto my-auto overflow-x-scroll md:text-sm text-xs text-black">




                <table className="table-auto w-full overflow-x-auto">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}

                                        </div>

                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-slate-200">
                        {table.getRowModel().rows.map((row) => (

                            // <tr className="hover:cursor-pointer hover:font-semibold" id={row.getValue('tconst')} key={row.id} onClick={(event) => handleRowClick(row.getValue('tconst'), row.getValue('primaryTitle'))}>
                            <tr className="hover:bg-slate-100" id={row.getValue('tconst')} key={row.id} >


                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={cell.column.id === 'primaryTitle' ? 'text-left hover:cursor-pointer hover:font-semibold' : 'text-left'} onClick={cell.column.id === 'primaryTitle' ? () => handleRowClick(row.original) : () => { }}>


                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>


                        ))}
                    </tbody>
                </table>

                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
            </div>
        </>
    );

}

export default ReactTableMovies;