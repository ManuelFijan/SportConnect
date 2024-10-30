import { Dispatch, SetStateAction } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    return (
        <div className="md:hidden cursor-pointer ml-[50%]">
            <div
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "opacity-0" : ""}`} />
                <div className={`w-6 h-1 bg-blue-500 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`} />
            </div>

            {isOpen && (
                <div className="fixed top-[250px] left-0 w-full bg-gray-700 flex flex-col items-center justify-center gap-8 font-medium text-xl">
                    <a href="/" className="text-white">Home</a>
                    <a href="/" className="text-white">Friends</a>
                    <a href="/" className="text-white">Groups</a>
                    <a href="/" className="text-white">Stories</a>
                    <a href="/" className="text-white">Profile</a>
                </div>
            )}
        </div>
    );
}

export default MobileMenu;