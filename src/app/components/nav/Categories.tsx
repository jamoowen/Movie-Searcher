"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

type MenuItem = {
    label: string;
    path: string;
};

const items: MenuItem[] = [
    { label: "Actors", path: "/search/actors" },
    { label: "Directors", path: "/search/directors" },
    { label: "Genres", path: "/search/genres" },

]



export default function Categories() {

    const [open, setOpen] = useState(false)
    const toggleOpen = () => { setOpen(true) }
    const toggleClose = () => { setOpen(false) }

    return (
        <>
            <div onClick={toggleOpen}
                className="cursor-pointer flex-row items-center row-span-1 flex gap-2"
            >
                <div>Categories</div>
                <AiOutlineMenu />
            </div>

          
                <div onMouseLeave={toggleClose} className="absolute bg-white items-center shadow-md w-[40vw] rounded-md left-1/3 top-12">
                    {open && (
                        <div className="fixed  flex justify-center ">
                            <div className="bg-white shadow-md w-[40vw] rounded-md p-4">
                                {items.map((item) => (
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
       
        </>
    )
}
