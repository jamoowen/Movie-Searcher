"use client"

import Link from "next/link";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { AuthButton }



const accountOptions = [
    { label: "Account", path: "/account" },
    { label: "Sign out", path: "/signin" },
]


export default function Account({ session, data }) {

    const supabase = createClientComponentClient();
    const router = useRouter();
    const user = session?.user;



    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(!open) }
    const toggleClose = () => { setOpen(false) }

    const handleSignOut = async () => {
        console.log("signing out..")
        await supabase.auth.signOut();
        router.refresh();
        console.log("signed out")
    }



    return (

        <div className="flex-row flex gap-2 items-center">

            <div onClick={toggleOpen}>

                <div className="cursor-pointer flex-row items-center row-span-1 flex gap-1">
                    {(user) ? <div className="text-black">
                        <Image
                            alt="user avatar"
                            src={data.avatarUrl}
                            width="50"
                            height="50"
                        />
                    </div>
                        : <MdAccountCircle className="h-10 w-10" />}

                </div>

                <div onMouseLeave={toggleClose} className="absolute bg-white  shadow-md w-[40vw] rounded-md right-0 top-12">
                    {open && (
                        <div className="fixed flex  ">
                            <div className="bg-white shadow-md w-[40vw] rounded-md p-4">
                                <div className="text-slate-400 font-light italic font-serif opacity-50">
                                    {data.name}
                                </div>

                                <Link href="/account" >
                                    <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                        Account
                                    </div>
                                </Link>

                                <div onClick={handleSignOut} className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                    Sign Out
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>

    )
}