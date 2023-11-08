'use client'


import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect, useCallback } from 'react'
import WatchlistTable from './WatchlistTable';
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

type Watchlist = Database['public']['Tables']['watchlist']['Row'];

/* 
    @de
*/

const WatchlistData = ({ session }: { session: Session | null }) => {

    const supabase = createClientComponentClient<Database>();
    const user = session?.user;



    const [watchlistData, setWatchlistdata] = useState<Watchlist[] | null>(null);
    const [searchParams, setSearchParams] = useState<string | null>(null);
    
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        (async () => {
            try {
                const { data, error } = await supabase
                    .from('watchlist')
                    .select('*')
                    .eq('user_id', user?.id)
                // console.log('data retrieved: ', data)
                setWatchlistdata(data)

            } catch (error) {
                alert('error fetching movie data')
            }
            finally {
                setLoading(false);
            }
        })
            ();
    }, [WatchlistData])



    return (
        <div className='text-black'>
            <div className="text-lg flex flex-col border-teal-500 w-auto border-4 bg-slate-200 px-2 py-2 gap-3 bg-opacity-50 rounded-md mt-2 mb-2">
                Here's your watchlist! <br />
                If you want to remove a movie just click on it 
            </div>

            {watchlistData ?

                <div className='mt-10 mb-2'>
                   

                    <div className='flex flex-row items-center mb-2 gap-3'>
                       

                    </div>
                    <WatchlistTable session={session} data={watchlistData} />
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

export default WatchlistData