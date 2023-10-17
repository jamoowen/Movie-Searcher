"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";


const Signin = () => {

    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'example@email.com', 
            password: 'example-password',
        })
    }
    
    
    return (

        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 sm:w-4/12 w-8/12 rounded-md  border border-neutral-600">
        <div className="mb-5 text-xl font-medium text-white">Sign In </div>
        <form  onSubmit={handleSignIn} >
        
            <label className="block text-black">
                <span className="block text-sm font-medium text-slate-500">Email</span>

                <input type="email" name="email" placeholder="...@gmail.com" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                <span className="block text-sm font-medium text-slate-500">Password</span>

                <input type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                
                <button type="submit" disabled={submitDisabled} className="bg-blue-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign Up</button>
              
            </label>






        </form>

    </div>

    )
}

export default Signin;
