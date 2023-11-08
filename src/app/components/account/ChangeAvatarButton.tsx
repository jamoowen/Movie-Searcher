'use client'

import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import Error from "next/error";
import { useRouter } from "next/navigation";
import Image from "next/image";


const ChangeAvatarButton = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const user = session?.user;



    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [avatars, setAvatars] = useState<string[] | null>([])
    const [newAvatar, setNewAvatar] = useState<string | null>(null)
    // const [newName, setNewName] = useState(null)

    const handleClick = () => {

        setShowForm(!showForm)
    }
    // 



    // use callback will execute on mount (fetch the avatars)
    const getAvatars = useCallback(async () => {
      

        const getAvatarUrl = async (avatarName: String) => {
            const { data } = await supabase
                .storage
                .from('images')
                .getPublicUrl(`avatars/${avatarName}`)
            return data.publicUrl;
        }
        try {
            const { data, error } = await supabase
                .storage
                .from('images')
                .list('avatars')

            if (data) {
                let avatarNames = data.map(avatar => avatar.name)
                let avatarUrls = await Promise.all(avatarNames.map(getAvatarUrl));
                setAvatars(avatarUrls);

            }
        } catch (error) {
            console.log(`error: ${error}\n `)
            alert('error loading avatar urls')
            
        } finally {
           
        }
    }, [user, supabase]
    )

    useEffect(() => {
        getAvatars()
    }, [user, getAvatars])

    const handleRadio = (avatarChange: string) => {
        setNewAvatar(avatarChange)
        setLoading(false)
    }


    const updateAvatar =async () => {
        setLoading(true);
        console.log('submitting: ', newAvatar);
        try {
            
            if (!newAvatar) {
                alert("You must select a new avatar!")
                return
            }

            const { error } = await supabase.from('profiles').upsert({
                user_id: user?.id as string,
                avatarUrl: newAvatar,
            })
            if (error) throw error
            alert('Avatar updated!')
        } catch (error) {
            alert(`Error updating the data:${error}`)
        } finally {
            setLoading(false)
            router.refresh();
        }
    }

    // fetch data

    return (
        <div className="flex flex-col px-2 py-2">

            <button onClick={handleClick} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Avatar</button>
            {showForm && <div className="justify-start py-2 gap-2">
                select an avatar
                <div className="gap-3 mt-2 shrink-0 flex overflow-x-scroll ">
                   
                    {avatars?.map((avatar) => (
                        <div key={avatar} className="shrink-0">
                            <input type="radio" onChange={()=>handleRadio(avatar)} name="option" id={avatar} className=""></input>
                            <Image 
                                src={avatar}
                                // fill={true}
                                width={100}
                                height={100}
                                alt={"avatar"}
                                objectFit="cover"
                    
                            />

                        </div>
                    ))}
                    
                </div>
                <button onClick={updateAvatar} disabled={loading} className="w-32 bg-teal-500 border-2 text-white disabled:bg-opacity-50 border-orange-500 mt-2 rounded-md ">Save</button>
            </div>}


        </div>

    )
}
export default ChangeAvatarButton;