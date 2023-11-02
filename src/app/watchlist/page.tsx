'use client'
// import { useCallback, useEffect, useState } from 'react'
// import { Database } from '../database.types'
// import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// import { cookies } from 'next/headers'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'



const Watchlist = () => {

    const supabase = createClientComponentClient()


    async function handleDelete() {
        console.log('deleting row!')
    }

    return (

        <div className="flex flex-col items-center mt-10 my-auto px-2 py-2 rounded-lg mx-auto h-screen w-[80vw] bg-white">
                <div className="flex ">
                <h1 className="text-4xl mb-6 text-teal-500 font-bold from-stone-500 to-slate-900">
                    My Watchlist
                </h1>
                </div>


            <div className="text-black">
                <table className="table-auto rounded-sm  ">
                    <thead className="border border-black text-white bg-gray-900">
                        <tr>
                            <th>Movie</th>
                            <th>Release Year</th>
                            <th>Director</th>
                            <th>IMDB score</th>
                            <th>Starring actors</th>
                            <th className='text-red-700'>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr className="cursor-auto group items-center justify-center" >
                            
                            <td className="group-hover:bg-gray-100 text-teal-500 cursor-pointer underline border border-slate-500">The grinch who stole chrismas </td>
                            <td className="group-hover:bg-gray-100  border border-slate-500">1990 </td>
                            <td className="group-hover:bg-gray-100  border border-slate-500">Kubrick </td>
                            <td className="group-hover:bg-gray-100  border border-slate-500">7.5</td>
                            <td className="group-hover:bg-gray-100  border border-slate-500">Jim Carey, Douglas hoffman </td>
                            
                            <td onClick={handleDelete} className='mx-auto cursor-pointer flex my-auto justify-center mt-2 items-center w-8 h-8 rounded-lg bg-red-600 hover:bg-red-600 hover:text-white'>x</td>
                           
                            
                        </tr>
                        
                    
                 
                    </tbody>
                </table>
            </div>
            Here cookies: <br/>
     

        </div>

    )
}
export default Watchlist