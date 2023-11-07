import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import AccountForm from "../components/account/AccountForm";
import { cookies } from "next/headers";


const Account = async () => {

    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;


    const { data, error, status } = await supabase.from('profiles')
        .select('name, avatarUrl, user_id')
        .eq('user_id', user?.id)
        .single();

    return (
        <div className="mx-auto my-auto min-h-screen mt-7 overflow-hidden animate-slide md:w-4/6 w-11/12 rounded-sm px-2 py-2 bg-white">

            <AccountForm session={session} data={data} />
        </div>
    )
}
export default Account