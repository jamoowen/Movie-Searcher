"use client"

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSolidCameraMovie } from "react-icons/bi"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';




type MenuItem = {
    label: string;
    path: string;
};

const items: MenuItem[] = [
    { label: "Movies", path: "/movies" },
    // { label: "Actors", path: "/actors" },
    // { label: "Directors", path: "/directors" },
    // { label: "Genres", path: "/genres" },
]




export default function Categories() {

    const [open, setOpen] = useState(false)


    const toggleOpen = () => { setOpen(!open) }

    const toggleClose = () => {
        if (open) {
            setOpen(false)
        }
    }

    // if (typeof document !== 'undefined') {
    //     document.getElementById('mainBody')?.addEventListener('click', toggleClose)
    // }


    return (
        <>
            <div onClick={toggleOpen} className="cursor-pointer flex-row items-center text-lg row-span-1 flex gap-1">
                <div>Find a Movie </div>
                <BiSolidCameraMovie />
            </div>


            <div  className="absolute bg-white items-center shadow-md w-[40vw] rounded-md left-1/3 top-12">
                {open && (
                    <ClickAwayListener onClickAway={toggleClose}>
                        <div className="fixed  flex justify-center ">
                            <div className="bg-white shadow-md w-[40vw] rounded-md p-4">
                                {items.map((item) => (
                                    <Link href={item.path} key={item.label} onClick={toggleClose}>
                                        <div className="hover:bg-gray-100 rounded-md p-2 cursor-pointer">
                                            {item.label}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </ClickAwayListener>
                )}

            </div>

        </>
    )
}
