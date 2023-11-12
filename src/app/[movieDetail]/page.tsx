// import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useParams } from 'next/navigation'


export default function Authenticate() {
    // const router = useRouter();
    const supabase = createClientComponentClient();
    const params = useParams();


    return (


        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 w-10/12 rounded-md bg-stone-100  border border-neutral-600">
            tessting

        </div>

    )
}