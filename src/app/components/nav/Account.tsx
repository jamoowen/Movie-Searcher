"use client"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";

const accountOptions = [
    {label: "Watchlist", path:"/"},
    {label: "Settings", path:"/"},
]


export default function Account() {

    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(true) }
    const toggleClose = () => { setOpen(false) }

    return (

        <>
        <div onClick={toggleOpen}>
            <div 
                className="cursor-pointer flex-row items-center row-span-1 flex gap-2"
            >
                <MdAccountCircle className="h-10 w-10" />
            </div>

        
                <div onMouseLeave={toggleClose} className="absolute bg-white  shadow-md w-[40vw] rounded-md right-0 top-12">
                    {open && (
                        <div className="fixed flex  ">
                            <div className="bg-white shadow-md w-[40vw] rounded-md p-4">

                            {accountOptions.map((item) => (
                                    <Link href={item.path} key={item.label}>
                                        <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                            {item.label}
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>
                    )}

                </div>
                </div>
        </>
    )
}