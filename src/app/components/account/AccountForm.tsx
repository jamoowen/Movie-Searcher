'use client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";
import ChangeNameButton from "./ChangeNameButton";
import ChangePasswordButton from './ChangePasswordButton';
import ChangeAvatarButton from './ChangeAvatarButton';

type Profiles = Database['public']['Tables']['profiles']['Row'];

type AccountFormProps = {
    session: Session | null;
    data: Profiles | null;
}


const AccountForm: React.FC<AccountFormProps> = ({ session, data }) => {
  

    const supabase = createClientComponentClient<Database>();
    const user = session?.user;


    const [name, setName] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleLoading = () => {
        setLoading(!loading);
    }

    useEffect(() => {
        if (data?.name && data?.avatarUrl) {
            setName(data?.name)
            setAvatar(data?.avatarUrl)
        }

    }, [data?.name, data?.avatarUrl])



    return (
        <>
           
                <div className="flex flex-col py-2 text-black">
                    {(avatar && name) ?
                        <>
                            <div className="text-3xl w-min  font-pixel py-4 border-2 border-teal-500 px-5 -rotate-3 text-white bg-orange-500 mb-3">
                                <div className="rotate-3
                                3">Hello <span className='font-serif font-bold'>{name}</span></div>
                            </div>

                            <Image
                                src={avatar}
                                height={100}
                                width={100}
                                alt="avatar"
                            />
                        </>
                        : <div className="animate-spin h-5 w-5 mr-3"><AiOutlineLoading3Quarters /></div>}

                </div>

                <ChangeNameButton session={session} />
                <ChangePasswordButton session={session} />
                <ChangeAvatarButton session={session} />


        </>
    )


}
export default AccountForm;

{/* <div className="flex flex-col">
<span className="text-gray-500">Settings</span>
<button onClick={handleChangeName} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Name</button>
<button onClick={handleChangePassword} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Password</button>
<button onClick={handleChangeAvatar} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Avatar</button>
</div> */}
