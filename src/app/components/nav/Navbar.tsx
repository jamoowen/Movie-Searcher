'use client'
import Image from "next/image"
import Link from "next/link"
import Account from "./Account"
import Categories from "./Categories"
import WatchlistButton from "./WatchlistButton"
import SignInButton from "./SignInButton"
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs'
// import { cookies } from "next/headers"
import { useCallback, useEffect, useState } from "react"



export default function Navbar() {

    // const cookieStore = cookies()
    const supabase = createClientComponentClient<Database>()



    type UserData = Database['public']['Tables']['profiles']['Row']

    const [userData, setUserData] = useState<UserData>();
    const [userSession, setUserSession] = useState<Session | null>(null);




    const getData = useCallback(async () => {
        console.log('fetching data in navbar client')
        const { data: { session }, } = await supabase.auth.getSession();
        
        if (!session) {
            throw Error
        }
        const user = session?.user;
        setUserSession(session)

        try {
            const { data, error } = await supabase.from('profiles')
                .select('name, avatarUrl, user_id')
                .eq('user_id', user?.id)
                .single();
            console.log(`data: ${data?.avatarUrl}`)

            if (data) {
                setUserData(data)

            }
        } catch (error) {
            console.log(`error: ${error}\n `)
            alert('error loading avatar urls')

        } finally {

        }
    }, [ supabase]
    )

    useEffect(() => {
        getData()
    }, [])


    // const fetchData = async () => {
    //     console.log('fetching data in navbar.tsx')
    //     if (user) {
    //         const { data, error, status } = await supabase.from('profiles')
    //             .select('name, avatarUrl, user_id')
    //             .eq('user_id', user?.id)
    //             .single();
    //         console.log(`data: ${data?.avatarUrl}`)
    //         return data
    //     } else {
    //         return null;
    //     }

    // }

    // const data = await fetchData();


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

                    {(userData) ?
                        <>
                            <WatchlistButton />
                            <Account session={userSession} data={userData} />
                        </>
                        : <SignInButton />}

                </div>

            </div>
        </nav>

    )
}