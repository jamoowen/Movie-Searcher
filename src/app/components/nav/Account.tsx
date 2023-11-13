"use client"

import Link from "next/link";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ClickAwayListener } from "@mui/base";
// import { AuthButton }

type Profiles = Database['public']['Tables']['profiles']['Row'];

type AccountProps = {
    session: Session | null;
    data: Profiles | null;
}

const accountOptions = [
    { label: "Account", path: "/account" },
    { label: "Sign out", path: "/signin" },
]


const Account: React.FC<AccountProps> = ({ session, data }) => {

    const supabase = createClientComponentClient();
    const router = useRouter();
    const user = session?.user;



    const [open, setOpen] = useState(false)


    const toggleOpen = () => { setOpen(!open) }
    const toggleClose = () => {
        if (open) {
            setOpen(false)
        }

    }

    const handleSignOut = async () => {
        // console.log("signing out..")
        await supabase.auth.signOut();
        router.refresh();
        console.log("signed out")
    }
    // document.getElementById('mainBody')?.addEventListener('click', toggleClose)


    return (
        <div className="flex-row flex gap-2 items-center">
            <div>
                <div onClick={toggleOpen} className="cursor-pointer flex-row items-center row-span-1 flex gap-1">
                    {(user && data?.avatarUrl) ? <div className="text-black">
                        <Image
                            alt="user avatar"
                            src={data?.avatarUrl}
                            width="50"
                            height="50"
                        />
                    </div>
                        : <MdAccountCircle className="h-10 w-10" />}

                </div>

                <div className="absolute bg-white  shadow-md w-[40vw] rounded-md right-0 top-12">
                    {open && (
                        <ClickAwayListener onClickAway={toggleClose}>
                            <div className="fixed flex  ">
                                <div className="bg-white shadow-md w-[40vw] rounded-md p-4">
                                    <div className="text-slate-400 font-light italic font-serif opacity-50">
                                        {data?.name}
                                    </div>

                                    <Link href="/account" >
                                        <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                            Account
                                        </div>
                                    </Link>

                                    <div onClick={handleSignOut} className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                        Sign Out
                                    </div>

                                    <Link href="/signin" >
                                        <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                            Sign In
                                        </div>
                                    </Link>
                                    <Link href="/signin?state=up" >
                                        <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                            Sign Up
                                        </div>
                                    </Link>


                                </div>
                            </div>
                        </ClickAwayListener>
                    )}

                </div>
            </div>
        </div>

    )
}
export default Account