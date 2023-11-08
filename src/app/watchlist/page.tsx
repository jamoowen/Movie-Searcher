

import { createServerComponentClient, Session, User } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import WatchlistData from "./WatchlistData";
// import Movies from "@/app/components/movies/Movies";


export default async function Movies() {
    console.log('what going on')
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    console.log('user:', user)

    //   const { data, error } = await supabase
    //     .from('watchlist')
    //     .select('*')
    //     .eq('user_id', user)

    //     if (data){console.log('data: ', data[0])}



    // const { data, error, status } = await supabase.from('watchlist')
    //     .select('*')
    //     .eq('user_id', user?.id)
    //     .single();




    return (
        // <div className="mx-auto items-center my-auto min-h-screen mt-5 w-6/12 overflow-hidden ml-5 mr-5 container bg-white">
        <div className="mx-auto my-auto min-h-screen overflow-hidden w-full mt-5 ml-5 mr-5 rounded-sm px-2 py-2 bg-white">
            <div className="flex flex-col py-2 ">
                <h1 className="text-3xl">Watchlist</h1>

                <WatchlistData session={session} />



            </div>
        </div>

    )
}


{/* <div className="w-11/12 bg-slate-200 rounded-md text-teal-500 border-black border-2">
            
            </div> */}