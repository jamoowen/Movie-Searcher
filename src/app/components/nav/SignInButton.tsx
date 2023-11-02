import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

export default function SignInButton() {

    return (

        <>
            <div >
                <Link href="/signin">
                <div className="cursor-pointer flex-row items-center row-span-1 py-1 px-2 flex gap-2 bg-gray-200 rounded-md text-teal-500">
                    Sign In
                </div>
                </Link>
               


            </div>
        </>
    )
}