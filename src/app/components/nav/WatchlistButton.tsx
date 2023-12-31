import Link from "next/link";
import { BsListCheck } from "react-icons/bs";

// import { AuthButton }


export default function WatchlistButton() {

    return (

        <>
            <Link href="/watchlist">
                <div className="cursor-pointer flex-row text-lg flex items-center gap-1 bg-teal-500 text-white rounded-sm py-1 px-2">
                    Watchlist
                    <BsListCheck />
                </div>
            </Link>
        </>
    )
}