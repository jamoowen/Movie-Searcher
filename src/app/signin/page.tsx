'use client'

import { useState } from "react"
// import Signin from "../components/signup/signin"
import Signin from "./signin"
import Signup from "./signup"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Authenticate() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [showSignup, setShowSignup] = useState('Sign Up');


    const handleClick = () => {
        if (showSignup === 'Sign Up') {

            setShowSignup('Sign In');
        } else {

            setShowSignup('Sign Up');
        }



    }
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()



    }


    return (


        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 w-10/12 rounded-md bg-stone-100  border border-neutral-600">
            {(showSignup === 'Sign Up') ? <Signin />
                : <Signup />
            }

            <button onClick={handleClick} className=" mt-5 bg-black rounded-md text-white px-2 py-1">{showSignup}</button>
            {/* <button onClick={handleSignOut} className="bg-red-500 mt-5 w-full rounded-sm text-black">Sign out</button> */}

        </div>

    )
}