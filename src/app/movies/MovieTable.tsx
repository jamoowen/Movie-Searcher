'use client'


import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect, useCallback } from 'react'
import ReactTableMovies from './ReactTableMovies'
import { Input } from '@mui/base/Input';
import Image from 'next/image';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import {
    Column,
    Table as ReactTable,
    PaginationState,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
    OnChangeFn,
    flexRender,
} from '@tanstack/react-table'
import { equal } from 'assert';
import { Popper } from '@mui/base/Popper';
import { error } from 'console';

type Movies = Database['public']['Tables']['movies']['Row'];

/* 
    @de
*/

const MovieTable = ({ session }: { session: Session | null }) => {

    const supabase = createClientComponentClient<Database>();
    const user = session?.user;

    type SearchKeys = string;
    type SearchValues = string;

    type SearchObject = Record<SearchKeys, SearchValues>;

    const searchObject: SearchObject = {
        "primaryTitle": "Search by Movie Title",
        "cast": "Search by Actor",
        "director": "Search by Director",
    };


    const [movieData, setMovieData] = useState<Movies[] | null>(null);
    const [searchParams, setSearchParams] = useState<string | null>(null);
    const [searchColumn, setSearchColumn] = useState<string | null>('primaryTitle');
    const [searchCategory, setSearchCategory] = useState<string>('primaryTitle');
    const [searchCount, setSearchCount] = useState(0)
    const [loading, setLoading] = useState(false);


    const handleSearch = (event: any) => {
        setLoading(true)
        event.preventDefault();
        var text = event.target.elements.inputText.value;
        setSearchParams(text);
        console.log(`searching: ${text}`)
        setSearchCount(searchCount+1);

    }

    useEffect(() => {

        (async () => {

            try {
                if (searchParams !== null && searchColumn !== null) {
                    const { data, error } = await supabase
                        .from('movies')
                        .select('*')
                        .ilike(searchColumn, `%${searchParams}%`)
                        .limit(100)
                    setMovieData(data)
                } else {
                    const { data, error } = await supabase
                        .from('movies')
                        .select('*')
                        .limit(100)
                    setMovieData(data)
                }
            } catch (error) {
                alert('error fetching movie data')
            }
            finally {
                console.log('finally')
                setLoading(false);
            }

            // console.log(`Movie Data: ${data[0]}`)

        })

            ();
    }, [searchParams, searchCount])

    const [buttonActivated, setButtonActivated] = useState({ 'primaryTitle': 'orange-500', 'cast': 'slate-200', 'director': 'slate-200' })

    const handleSearchCategory = (col: string) => {
        setSearchCategory(col);
        setSearchColumn(col);
        setButtonActivated(prevState => ({
            ...{ 'primaryTitle': 'slate-200', 'cast': 'slate-200', 'director': 'slate-200' },
            [col]: 'orange-500'
        }));

    }


    return (
        <div className='text-black'>
            <div className="text-lg flex flex-col border-teal-500 w-auto border-4 bg-slate-200 px-2 py-2 gap-3 bg-opacity-50 rounded-md mt-2 mb-2">
                Search by your movie title, the name of an actor, or the name of a director. <br />
                Click on column names to sort. <br />
                Click on movie title to add to your watchlist. <br />
            </div>

            {movieData ?

                <div className='mt-10 mb-2'>
                    <button onClick={() => handleSearchCategory('primaryTitle')} className={`rounded-md bg-${buttonActivated['primaryTitle']} hover:font-bold text-black w-24`}>Title</button>
                    <button onClick={() => handleSearchCategory('cast')} className={` rounded-md bg-${buttonActivated['cast']} hover:font-bold text-black w-24`}>Actor</button>
                    <button onClick={() => handleSearchCategory('director')} className={`rounded-md bg-${buttonActivated['director']} hover:font-bold text-black w-24`}>Director</button>

                    <div className='flex flex-row items-center mb-2 gap-3'>
                        <form onSubmit={handleSearch}>
                            <div className='w-56 mr-2'>{`${searchObject[searchCategory]}`}</div>
                            <input name='inputCol' type="hidden" value='primaryTitle' />
                            <input name='inputText' type="text" className="w-56 mr-2 text-sm font-sans font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-lg border border-solid border-slate-300 hover:border-teal-500 " />
                            {loading ?<button disabled className="animate-spin text-md font-sans "> <AiOutlineLoading3Quarters /></button>
                                : <button type='submit' className=" w-24 text-sm font-sans bg-teal-500 bg-opacity-20 hover:bg-opacity-100 font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 dark:shadow-slate-900 focus:shadow-lg border border-solid border-slate-300 hover:border-black "> Search</button>
                            }


                        </form>

                    </div>
                    <ReactTableMovies session={session} data={movieData} />
                </div>



                : <div>
                    <Image
                        alt="Movie search logo"
                        src="/images/film-wheel.png"
                        width="50"
                        height="50"
                        className="animate-spin"
                    />
                </div>}
        </div>
    )
}

export default MovieTable