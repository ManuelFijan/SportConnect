import {useState} from "react"

function MobileMenu(){

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className='md:hidden cursor-pointer'>
            <div className='flex flex-col gap-[4.5px] cursor-pointer'
                 onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "opacity-0" : ""}`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`} />
            </div>

            {isOpen && (
                <div className='absolute left-0 top-24 w-full h-[calc(100vh-95px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl'>
                    <a href="/">Home</a>
                    <a href="/">Friends</a>
                    <a href="/">Groups</a>
                    <a href="/">Stories</a>
                    <a href="/">Profile</a>
                </div>

            )}
        </div>
)
}

export default MobileMenu;