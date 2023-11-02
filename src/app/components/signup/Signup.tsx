"use client"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { validateEmail, validatePassword, confirmPassword } from "../helpers";
import { useRouter } from 'next/navigation'

// import Signup from "../components/signup/Signup";

const Signup = () => {

    const router = useRouter();
    const supabase = createClientComponentClient();



    const [signupDisabled, setSignupDisabled] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showPassword, setShowPassword] = useState("password");

    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")
        }
        return
    }
    const handleShowSignup = () => {
        setShowSignup(!showSignup)
    }



    // submit sign UP form 
    const handleSignup = async (event) => {
        event.preventDefault();
        setSignupDisabled(true)
        const email = event.target.elements.email.value;
        const password = event.target.elements.firstPassword.value;
        const secondPassword = event.target.elements.secondPassword.value;

        // validates email and password are valid
        if (!confirmPassword(password, secondPassword)) {
            alert("Passwords do not match")
            setSignupDisabled(false)
            return;
        }

        if (!validateEmail(email)) {
            alert("Email Invalid!")
            setSignupDisabled(false)
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be greater that 8 characters!");
            setSignupDisabled(false)
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `${location.origin}/api/callback`
            }
        })
        if (data.user){
            console.log('signed up!')
            router.refresh()
            
        } else {
     
            window.alert(`Error: ${error?.message}`)
            setSignupDisabled(false)
        }


        // Do something with the name
    };


    return (



        <>
            <div className="mb-5 text-xl font-medium text-black">Sign up with email </div>
            <form onSubmit={handleSignup} >
                <label className="block text-black">
                    <span className="block text-sm font-medium text-slate-500">Email</span>
                    <input type="email" autoComplete="email" name="email" placeholder="" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <span className="block text-sm font-medium text-slate-500">Password</span>
                    <input type={showPassword} name="firstPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <span className="block text-sm font-medium text-slate-500">Confirm Password</span>
                    <input type={showPassword} name="secondPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <input type="checkbox" onClick={handleShowPassword} /> <span className="text-slate-500">Show password</span>
                    <button type="submit" disabled={signupDisabled} className="bg-blue-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign Up</button>
                </label>
            </form>


        </>




    )
};

export default Signup;