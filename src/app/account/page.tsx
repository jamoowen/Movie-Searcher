import { createServerComponentClient, Session } from "@supabase/auth-helpers-nextjs"
import AccountForm from "../components/account/AccountForm";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";


const Account = async () => {

    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

    const { data: { session } } = await supabase.auth.getSession();
    const router = useRouter();

    const user = session?.user;

    const fetchData = async () => {
        if (user) {
            const { data, error, status } = await supabase.from('profiles')
                .select('name, avatarUrl, user_id')
                .eq('user_id', user.id)
                .single();
            return data
        } else {
            return null;
        }

        
    }

   
    const data = await fetchData();

    return (
        <div className="mx-auto my-auto min-h-screen mt-7 overflow-hidden animate-slide md:w-4/6 w-11/12 rounded-sm px-2 py-2 bg-white">

            {data ? <AccountForm session={session} data={data} />
                : <div>error fetching data</div>}



        </div>
    )
}
export default Account