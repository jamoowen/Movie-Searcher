import Image from "next/image"
import Link from "next/link"
import Account from "./Account"
import Categories from "./Categories"
import WatchlistButton from "./WatchlistButton"
import SignInButton from "./SignInButton"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"

export default async function Navbar() {

    const supabase = createServerComponentClient({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    const { data, error, status } = await supabase.from('profiles')
        .select('name, avatarUrl, user_id')
        .eq('user_id', user?.id)
        .single();



    return (

        <nav className="bg-white text-black">
            <div className="mx-auto md:px-10 lg:px-8">
                <div className="flex items-center flex-row justify-between py-1">

                    <Link href="/">
                        <Image
                            alt="Movie search logo"
                            src="/images/logo.png"
                            width="50"
                            height="50"
                        />
                    </Link>



                    <Categories />

                    {(session) ?
                        <>
                            <WatchlistButton />
                            <Account session={session} data={data} />
                        </>
                        : <SignInButton />}





                </div>

            </div>
        </nav>
 
    )
}