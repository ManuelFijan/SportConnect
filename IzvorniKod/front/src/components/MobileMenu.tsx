import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MobileMenu.css'

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const [isScreenWide, setIsScreenWide] = useState(window.innerWidth > 767);

    useEffect(() => {
        const handleResize = () => {
            const screenWide = window.innerWidth > 767;
            setIsScreenWide(screenWide);

            // Ako je širina veća od 767px, zatvori meni
            if (screenWide) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Uklanjamo event listener kada se komponenta unmountuje
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsOpen]); // Dodajemo setIsOpen kao zavisnost

    return (
        <div className="main-menu md:hidden ml-[50%]">
            <div
                className="flex flex-col gap-[4.5px] cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <div className={`line w-6 h-1 rounded-sm ${isOpen ? "rotate-45" : ""} origin-left ease-in-out duration-500`} />
                <div className={`line w-6 h-1 rounded-sm ${isOpen ? "opacity-0" : ""}`} />
                <div className={`line w-6 h-1 rounded-sm ${isOpen ? "-rotate-45" : ""} origin-left ease-in-out duration-500`} />
            </div>

            {(isOpen && !isScreenWide) && (
                <div className="menu fixed top-[80px] left-0 w-full flex flex-col items-center justify-center gap-8 font-medium text-xl">
                    <a href="/" className="text-white">Home</a>
                    <a href="/about-us" className="text-white">About</a>
                    <a href="/terms-of-service" className="text-white">Services</a>
                    <a href="/pricing" className="text-white">Pricing</a>
                    <a href="/" className="text-white">Messages</a>
                    <a href="/my-account" className="text-white">Profile</a>
                    <Link to="/" className="sign-out-button ml-8">
                        <button>Sign Out</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MobileMenu;