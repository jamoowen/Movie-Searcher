'use client'

import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import Error from "next/error";
import { useRouter } from "next/navigation";


const ChangeAvatarButton = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const user = session?.user;

    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [avatars, setAvatars] = useState('')
    // const [newName, setNewName] = useState(null)

    const handleClick = () => {
        if (!showForm) { getAvatars(); }
        setShowForm(!showForm)
    }

    const getAvatars = useCallback(async () => {
        setLoading(true);
        try {

            const { data, error1, status } = await supabase.from('profiles')
                .select('name, avatarUrl')
                .eq('user_id', user?.id)
                .single();


            const { data: avatarData, error } = await supabase
                .storage
                .getBucket('images')


            if (error) { throw error }

            console.log(`User data: ${data}\nUrl data: ${avatarData}`)
            if (avatarData) {
                console.log(avatarData)
                // setAvatars(data.)

            }
        } catch (error) {
            console.log(`error: ${error.message}\n `)
            alert('error loading user data')
        } finally {
            setLoading(false);

        }
    }, [user, supabase]
    )


    // upsert into db
    const updateName = async (event) => {
        event.preventDefault();
        console.log('changing name')
        try {
            setLoading(true)
            const newName = event.target.elements.newName.value;
            console.log(`New name: ${newName}`)
            if (!newName) {
                alert("You must provide a name to update")
                return
            }
            console.log(`user: ${user?.id}, name: ${newName}`)

            const { error } = await supabase.from('profiles').upsert({
                user_id: user?.id as string,
                name: newName,
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert(`Error updating the data:${error.message}`)
        } finally {
            setLoading(false)
            router.refresh();
        }

    }


    // fetch data

    return (
        <div className="flex flex-col px-2 py-2">

            <button onClick={handleClick} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Avatar</button>
            {showForm && <div className="flex flex-row justify-start py-1 gap-2">
                <div className="text-black">
                    select an avatar
                    {/* {avatars?.map((avatar) => (
                        <li key={avatar.name}>
                            {avatar.name}
                        </li>
                    ))} */}
                </div>
            </div>}


        </div>

    )
}
export default ChangeAvatarButton;