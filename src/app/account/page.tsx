import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import AccountForm from "../components/account/AccountForm";
import { cookies } from "next/headers";


const Account = async () => {

    const supabase = createServerComponentClient({ cookies });
    const {data: {session}} = await supabase.auth.getSession();
    

    
    return (
        <div className="h-screen w-screen flex bg-teal-500">
            
        
                <AccountForm session={session}/>
        </div>
    )
}
export default  Account