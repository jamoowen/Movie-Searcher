'use client'

import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import Error from "next/error";
import { useRouter } from "next/navigation";


const ChangeNameButton = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();
    const user = session?.user;

    const [showNameForm, setShowNameForm] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [newName, setNewName] = useState(null)

    const handleChangeName = () => {
        setShowNameForm(!showNameForm)
    }

    // upsert into db
    const updateName = async (event:any) => {
        event.preventDefault();
        console.log('changing name')
        try {
            setLoading(true)
            const newName = event.target.elements.newName.value;

            if (!newName) {
                alert("You must provide a name to update")
                return
            }
         

            const { error } = await supabase.from('profiles').upsert({
                user_id: user?.id as string,
                name: newName,
            })
            if (error) throw error
            alert('Profile updated!')
        } catch (error) {
            alert(`Error updating the data:${error}`)
        } finally {
            setLoading(false)
            router.refresh();
        }

    }


    // fetch data

    return (
        <div className="flex flex-col px-2 py-2 text-black">

            <button onClick={handleChangeName} className="w-32 bg-white border-4 border-teal-500 rounded-md ">Change Name</button>
            {showNameForm && <div className="flex flex-row justify-start py-1 gap-2">
                <form onSubmit={updateName} className="">
                    <input type="text" name="newName" placeholder="|" className="bg-teal-100 rounded-sm py-1" autoFocus />
                    <button disabled={loading} type="submit" className="disabled:bg-slate-300 rounded-md bg-teal-500 text-white py-1 px-2 gap-2">Submit</button>
                </form>
            </div>}


        </div>

    )
}
export default ChangeNameButton;