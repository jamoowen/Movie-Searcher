"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { validateEmail, validatePassword, confirmPassword } from "../components/helpers";
// import Signup from "../components/signup/Signup";

const Login = () => {

    const supabase = createClientComponentClient();

    const [signupDisabled, setSignupDisabled] = useState(false);
    const [showSignup, setShowSignup] = useState(true);
    const [showPassword, setShowPassword] = useState("password");

    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")
        }
        return
    }
    const handleShowSignup = () =>{
        setShowSignup(!showSignup)
    }

    // submit sign OUT
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
      }

    // Submit sign IN form 
    const handleSignin = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.firstPassword.value;
        await supabase.auth.signInWithPassword({
            email: email, 
            password: password,
            
        });
  

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
                emailRedirectTo: `${location.origin}/auth/callback`
            }
        })



        console.log(`password is valid, submitting email: ${email}, password: ${password}`)
        console.log(`data returned: ${data}, error: ${error}`)
        setSignupDisabled(false)

        // Do something with the name
    };


    return (

        <div className="flex flex-col items-center justify-center mx-auto mt-10 py-6 sm:w-4/12 w-8/12 rounded-md  border border-neutral-600">
            {showSignup ?
                <>
                    <div className="mb-5 text-xl font-medium text-white">Sign up with email </div>
                    <form onSubmit={handleSignup} >
                        <label className="block text-black">
                            <span className="block text-sm font-medium text-slate-500">Email</span>
                            <input type="email" autoComplete="email" name="email" placeholder="...@gmail.com" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                            <span className="block text-sm font-medium text-slate-500">Password</span>
                            <input type={showPassword} name="firstPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                            <span className="block text-sm font-medium text-slate-500">Confirm Password</span>
                            <input type={showPassword} name="secondPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                            <input type="checkbox" onClick={handleShowPassword} /> <span className="text-white">Show password</span>
                            <button type="submit" disabled={signupDisabled} className="bg-blue-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign Up</button>
                        </label>
                    </form>
                    <button type="submit" onClick={handleShowSignup} disabled={signupDisabled} className="text-white  rounded-md mt-5 block w-full px-3 py-2">Sign In</button>

                </>
                :<>
                <div className="mb-5 text-xl font-medium text-white">Sign In </div>
                <form onSubmit={handleSignin} >
                        <label className="block text-black">
                            <span className="block text-sm font-medium text-slate-500">Email</span>
                            <input type="email" autoComplete="email" name="email" placeholder="...@gmail.com" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                            <span className="block text-sm font-medium text-slate-500">Password</span>
                            <input type={showPassword} name="firstPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                            
                            <input type="checkbox" onClick={handleShowPassword} /> <span className="text-white">Show password</span>
                            <button type="submit" disabled={signupDisabled} className="bg-green-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign In</button>
                        </label>
                    </form>
                    < div className="py-2 items-center" >Forgotten pasword?</div>
                    <button type="submit" onClick={handleShowSignup} disabled={signupDisabled} className="text-white  rounded-md mt-5 block w-full px-3 py-2">Sign Up</button>
                </>}
                <button onClick={handleSignOut} disabled={signupDisabled} className="bg-red-400 disabled:bg-slate-400 rounded-md mt-5 block w-full px-3 py-2">Sign OUT</button>

        </div>
        
    )
};

export default Login;