import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import MovieTable from "./MovieTable";



export default async function Movies() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })


  const {
    data: { session },
  } = await supabase.auth.getSession();
  // const user = session?.user;

  // const { data, error } = await supabase
  //   .from('movies')
  //   .select('*')
  //   .limit(100)

  // console.log(`data returned = ${data[0]}`)





  return (
    // <div className="mx-auto items-center my-auto min-h-screen mt-5 w-6/12 overflow-hidden ml-5 mr-5 container bg-white">
 <div className="mx-auto my-auto min-h-screen overflow-hidden w-full mt-5 ml-5 mr-5 rounded-sm px-2 py-2 bg-white">
      <div className="flex flex-col py-2 ">
        <h1 className="text-3xl">Movie Search</h1>

        <MovieTable session={session} />
      </div>
    </div>
    
  )
}


{/* <div className="w-11/12 bg-slate-200 rounded-md text-teal-500 border-black border-2">
            
            </div> */}