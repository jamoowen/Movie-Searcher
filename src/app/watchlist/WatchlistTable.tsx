'use client'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable,
    PaginationState,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Table,

} from "@tanstack/react-table";
import React, { useState } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { AiOutlineCheck } from 'react-icons/ai'
import { CiSquareRemove } from 'react-icons/ci'




type Watchlist = {
    averageRating: number;
    cast: string;
    castNconst: string;
    dirconst: string;
    director: string;
    genres: string;
    id: number;
    primaryTitle: string;
    runtimeMinutes: number;
    startYear: number;
    tconst: string;
    user_id: string;
}



/**
 * @prop {Watchlist[]} data watchlist data passed from parent component (WatchlistData.tsx)
 * @prop {Session} session a session object to interact with supabase auth
 * @dev this component instantiates a tanstack table the columns variable below defines the structure of the table
 *      and is the most critical component
 * @dev The table uses pagination and sorting
 * @dev The table has an click event handler on the primaryTitle col which allows users to delete from watchlist
 */

const WatchlistTable = ({ defaultData, session }: {defaultData: Watchlist[], session: Session | null }) => {

    // !!! note to self - to delete data from a tanstack table, you must first set the state of the table data
    // (see below in table instantialtion)

    
    const user = session?.user;
    const supabase = createClientComponentClient<Database>();

    /* 
    ---------------Table DEF
    */

    const columnHelper = createColumnHelper<Watchlist>();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

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
        columnHelper.accessor("id", {
            header: "id",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("user_id", {
            header: "user_id",
            cell: (info) => info.getValue(),
        }),

    ]
    const [data, setData] = useState<Watchlist[]>(() => [...defaultData]);
    

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
                id: false,
                user_id: false,
            },
        },
    });

    /* 
    ----------------END TABLE DEF
    */



    const [selected, setSelected] = useState<string | null>(null);
    const [selectedRow, setSelectedRow] = useState< any | null>(null);
    const [popupVis, setPopupVis] = useState(false);
    const [removeButton, setRemoveButton] = useState(true);


    // if the movie title cell is clicked => a button pops up with a bg covering the screen. 
    // gives the option to add to watchlist
    const handleRowClick = (row: any) => {
        // const newData = data.splice(row.index)
    
        setRemoveButton(true);
        setPopupVis(true);
        setSelected(row.original['primaryTitle'])
        setSelectedRow(row);

    }

    // if the add button in the popup clicked, this func will insert the user_id value to the row data
    // the data will then be inserted into the users wathlist table
    const handleRemove = async () => {
        console.log('rowdata: ')

        if (user && selectedRow) {
        
            try {
                await supabase
                    .from('watchlist')
                    .delete()
                    .eq('tconst', selectedRow.original.tconst)
                let dataCopy = data.slice();
                dataCopy.splice(selectedRow.index, 1)
                setData(dataCopy);

            } catch (error) {
                alert(`error adding to watchlist: ${error}`)
            }


            finally {
                setRemoveButton(false)
                setTimeout(() => setPopupVis(false), 500)
            }

        }

    }

    return (
        <>
            {popupVis &&
                <div id="popup" className="fixed bg-white top-[1%] left-[1%]  w-screen h-screen bg-opacity-75 poin text-black">
                    <ClickAwayListener onClickAway={() => setPopupVis(false)}>
                        <div className={`fixed mx-auto my-auto w-64 h-auto py-1 px-2 rounded-sm border border-red-600 bg-white gap-2 text-black text-sm left-[15%] top-[40%]`}>
                            <div className="relative">
                                <span className="text-bold text-black text-xl">{selected} <br /></span>
                                <div className="flex flex-row">
                                    {removeButton ?
                                        <div className="items-center justify-center my-auto">Remove
                                            <button onClick={handleRemove} className=" ml-2 text-xl bg-orange-600 rounded-md border-white border text-black"><CiSquareRemove /></button>
                                        </div>

                                        : <> <div className="text-red-600 ml-2 mr-2 px-1 py-1 w-8 items-center">Removed </div></>
                                    }
                                </div>
                                <div className="absolute top-0 right-0">
                                    <button onClick={() => setPopupVis(false)} className=" rounded-sm text-red text-xl"><CiSquareRemove /></button>
                                </div>
                            </div>

                        </div>

                    </ClickAwayListener>

                </div>
            }


            <div className="w-full  mx-auto my-auto overflow-x-scroll md:text-sm text-xs text-black">

                <table className="table-auto w-full overflow-x-auto">
                    <thead className="font-bold text-teal-600">
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
                    <tbody className="bg-teal-500 bg-opacity-20 border p-1 border-teal-600">
                        {table.getRowModel().rows.map((row) => (

                            // <tr className="hover:cursor-pointer hover:font-semibold" id={row.getValue('tconst')} key={row.id} onClick={(event) => handleRowClick(row.getValue('tconst'), row.getValue('primaryTitle'))}>
                            <tr className="hover:bg-slate-100 border-black border-opacity-20 border" id={row.getValue('tconst')} key={row.id} >


                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className={cell.column.id === 'primaryTitle' ? 'text-left hover:cursor-pointer ' : 'text-left'} onClick={cell.column.id === 'primaryTitle' ? () => handleRowClick(row) : () => { }}>


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

export default WatchlistTable;