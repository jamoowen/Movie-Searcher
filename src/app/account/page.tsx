import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import AccountForm from "../components/account/AccountForm";
import { cookies } from "next/headers";


const Account = async () => {

    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    
    const { data, error, status } = await supabase.from('profiles')
        .select('name, avatarUrl')
        .eq('user_id', user?.id)
        .single();

    return (
        <div className="min-h-screen w-full flex  bg-teal-500">


            <AccountForm session={session} data={data} />
        </div>
    )
}
export default Account