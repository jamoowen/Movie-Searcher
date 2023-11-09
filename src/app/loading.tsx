
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="w-screen h-screen flex flex-col bg-white text-6xl text-black items-center justify-center mx-auto my-auto">
            <div className='animate-spin'>
                <AiOutlineLoading3Quarters />
            </div>
            

        </div>
    )
}