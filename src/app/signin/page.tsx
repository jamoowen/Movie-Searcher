'use client'

import { useState } from "react"
// import Signin from "../components/signup/signin"
import Signin from "./signin"
import Signup from "./signup"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useSearchParams } from 'next/navigation'


export default function Authenticate() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const searchParams = useSearchParams();
    

    const searchParamResult = searchParams.get('state');

    const getStartState = () => {
        if (searchParamResult==='up'){
            return 'up'
        } else {return 'in'}
    }

    const startState = getStartState()
    console.log('startstate', startState)

    const [showSignup, setShowSignup] = useState(startState);



    const handleClick = () => {
        if (showSignup === 'up') {

            setShowSignup('in');
        } else {

            setShowSignup('up');
        }



    }
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()



    }


    return (


        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 w-10/12 rounded-md bg-stone-100  border border-neutral-600">
            {(showSignup === 'in') ? <Signin />
                : <Signup />
            }

            <button onClick={handleClick} className=" mt-5 bg-black rounded-md text-white px-2 py-1">{showSignup==='up'? 'Sign In' : 'Sign up'}</button>
            {/* <button onClick={handleSignOut} className="bg-red-500 mt-5 w-full rounded-sm text-black">Sign out</button> */}

        </div>

    )
}