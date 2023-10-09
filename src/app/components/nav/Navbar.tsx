import Image from "next/image"
import Link from "next/link"
import Account from "./Account"
import Categories from "./Categories"

export default function Navbar() {
    return (
        <nav className="bg-white text-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between">
                    <Link href="/">
                    <Image
                    alt="Movie search logo"
                    src="/images/logo.png"
                    width="50"
                    height="50"
                    />
                    </Link>

                    <Categories />
                    <Account/>

                    
       
                </div>
             
            </div>
        </nav>
    )
}