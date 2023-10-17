import type { FormEventHandler } from "react"
export default function Signup(handleSignup, signupDisabled: boolean) {
    return (
        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 sm:w-4/12 w-8/12 rounded-md  border border-neutral-600">
        <div className="mb-5 text-xl font-medium text-white">Sign up with email </div>
        <form  onSubmit={handleSignup} >
        
            <label className="block text-black">
                <span className="block text-sm font-medium text-slate-500">Email</span>

                <input type="email" name="email" placeholder="...@gmail.com" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                <span className="block text-sm font-medium text-slate-500">Password</span>

                <input type="password" name="password" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                
                <span className="block text-sm font-medium text-slate-500">Confirm Password</span>
                <input type="password" name="secondPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                
                <button type="submit" disabled={signupDisabled} className="bg-blue-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign Up</button>
              
            </label>






        </form>

    </div>
    )
}