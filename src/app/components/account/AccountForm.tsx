'use client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
import ChangeNameButton from "./ChangeNameButton";
import ChangePasswordButton from './ChangePasswordButton';
import ChangeAvatarButton from './ChangeAvatarButton';

const AccountForm = ({ session }: { session: Session | null }) => {

    const supabase = createClientComponentClient();
    const user = session?.user;


    const [name, setName] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string>('');
    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleLoading = () => {
        setLoading(!loading);
    }

    // fetch data
    // works as a callback 
    const getProfile = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error, status } = await supabase.from('profiles')
                .select('name, avatarUrl')
                .eq('user_id', user?.id)
                .single();
            if (error && status !== 406) { throw error }

            if (data) {
                setName(data.name);
                setAvatar(data.avatarUrl);
            }
        } catch (error) {
            console.log(`error: ${error}\n `)
            alert('error loading user data')
        } finally {
            setLoading(false);
        }
    }, [user, supabase]
    )

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    if (user && !loading) {
        return (
            <>
                <div className="mx-auto my-auto h-5/6 md:w-5/6 w-11/12 rounded-sm px-2 py-2  bg-white">
                    <div className="flex flex-col">
                        <h1>Hello {name}</h1>
                        <Image
                            src={avatar}
                            height={100}
                            width={100}
                            alt="avatar"
                        />
                    </div>

                    <ChangeNameButton session={session} />
                   <ChangePasswordButton session={session} />
                    <ChangeAvatarButton session={session}/>

                </div>
            </>
        )
    } else {
        return (
            <div className="h-screen w-screen flex items-center bg-slate-600 bg-opacity-80">
                <div className=" mx-auto my-auto items-center">
                    <div className="animate-spin h-5 w-5 mr-3"><AiOutlineLoading3Quarters /></div>
                    <div className="bg-black text-white w-32"> Loading</div>
                </div>
            </div>
        )
    }

}
export default AccountForm;

{/* <div className="flex flex-col">
<span className="text-gray-500">Settings</span>
<button onClick={handleChangeName} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Name</button>
<button onClick={handleChangePassword} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Password</button>
<button onClick={handleChangeAvatar} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Avatar</button>
</div> */}
