"use client"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { validateEmail, validatePassword, confirmPassword } from "../helpers";
import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'


// import Signup from "../components/signup/Signup";

const Signin = () => {


    const supabase = createClientComponentClient();

    const router = useRouter();



    const [showPassword, setShowPassword] = useState("password");
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")
        }
        return
    }

    const handleSignin = async (event) => {
        setLoading(true)
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.firstPassword.value;
        const { data: { user }, } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,

        });
        if (user) {
            console.log('logged in');
            router.refresh();
            // router.push('/')
        } else {
            console.log("error signin in")
            window.alert("Incorrect username/password combination")
            setLoading(false)
        }
    }

    const handlePasswordReset = async (e) => {
        setLoading(true)
        e.preventDefault();
        const resetEmail = e.target.elements.resetEmail.value;
        await supabase.auth.resetPasswordForEmail(resetEmail, {
            redirectTo: `${location.origin}/api/resetPassword`,
        })
        alert(`password reset sent to ${resetEmail}`)
        setLoading(false)
    }


    return (



        <>
            <div className="mb-5 text-xl font-medium text-black">Sign In </div>
            <form onSubmit={handleSignin} >
                <label className="block text-black">
                    <span className="block text-sm font-medium text-slate-500">Email</span>
                    <input type="email" autoComplete="email" name="email" placeholder="" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <span className="block text-sm font-medium text-slate-500">Password</span>
                    <input type={showPassword} name="firstPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />

                    <input type="checkbox" onClick={handleShowPassword} /> <span className="text-slate-500">Show password</span>
                    <button type="submit" disabled={loading} className="bg-green-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign In</button>
                </label>
            </form>
            < div onClick={() => { setShowPasswordReset(!showPasswordReset) }} className="py-2 items-center text-black" >Forgotten pasword?</div>
            {showPasswordReset &&
                <div>
                    <form onSubmit={handlePasswordReset}>
                        <input type="email" autoComplete="email" name="resetEmail" placeholder="Enter your email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                        <button type="submit" disabled={loading} className="bg-yellow-500 disabled:bg-slate-400 rounded-md mt-2 block w-full px-3 py-2">Reset Password</button>
                    </form>
                </div>
            }

        </>




    )
};

export default Signin;