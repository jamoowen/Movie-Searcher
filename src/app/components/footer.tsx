import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai"
import Link from "next/link"

const Footer = () => {

    return (
        <div className="w-auto italic text-sm fixed bottom-0 flex flex-row gap-3 items-center">
            2023 by James Owen
            <div className="flex flex-row text-3xl gap-3 ">
                <Link href="https://github.com/jamoowen" target="_blank">
                    < AiFillGithub />
                </Link>
                <Link href="https://twitter.com/jmsowen24" target="_blank">
                    < AiFillTwitterCircle />
                </Link>

            </div>
        </div>
    )
}
export default Footer