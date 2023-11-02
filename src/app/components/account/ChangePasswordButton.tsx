'use client'

import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { validatePassword, confirmPassword } from "../helpers";
import { useRouter } from "next/navigation";

const ChangePasswordButton = ({ session }: { session: Session | null }) => {
    const router = useRouter()
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showPassword, setShowPassword] = useState("password");

    const handleShowPassword = () => {
        if (showPassword === "password") {
            setShowPassword("text")
        } else {
            setShowPassword("password")
        }
        return
    }
    const handleChangePassword = () => {
        setShowPasswordForm(!showPasswordForm)
    }


    const updatePassword = async (event) => {
        event.preventDefault();
        console.log('changing password')
        try {
            setLoading(true)
            const password = event.target.elements.firstPassword.value;
            const secondPassword = event.target.elements.secondPassword.value;

            if (!confirmPassword(password, secondPassword)) {
                alert("Passwords do not match")
                setLoading(false)
                return;
            }

            if (!validatePassword(password)) {
                alert("Password must be greater that 8 characters!");
                setLoading(false)
                return;
            }


            const { data, error } = await supabase.auth.updateUser({ password: password })

            if (error) throw error
            alert('Password updated!')
        } catch (error) {
            alert(`Error updating the data:${error.message}`)
        } finally {
            setLoading(false)
            router.refresh();
        }

    }

    // fetch data

    return (
        <div className="flex flex-col px-2 py-2">

            <button onClick={handleChangePassword} className="w-40 bg-white border-4 border-teal-500 rounded-md">Change Password</button>
            {showPasswordForm && <div className="flex flex-row justify-start py-2 gap-2 ">
                <form onSubmit={updatePassword} className="flex flex-col items-start">
                    <span className="block text-sm font-medium text-slate-500">New Password</span>
                    <input type={showPassword} name="firstPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <span className="block text-sm font-medium text-slate-500">Confirm New Password</span>
                    <input type={showPassword} name="secondPassword" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-back shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " />
                    <div><input type="checkbox" onClick={handleShowPassword} placeholder=""></input> <span className="text-slate-500">Show password</span></div>

                    <button type="submit" className="rounded-md bg-teal-500 text-white py-1 mt-2 px-2 gap-2">Submit</button>
                </form>

            </div>}


        </div>

    )
}
export default ChangePasswordButton;

{/* <form onSubmit={updateName} className="">
                <input type="text" name="newName" placeholder="|" className="bg-teal-100 rounded-sm py-2" autoFocus />
                <button type="submit" className="rounded-md bg-teal-500 text-white py-2 px-2 gap-2">Submit</button>
            </form> */}