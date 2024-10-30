import { Dispatch, SetStateAction } from 'react';
import '../styles/Navbar.css'
import MobileMenu from "./MobileMenu";
import { Link } from 'react-router-dom';

interface NavbarProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Navbar({ isOpen, setIsOpen }: NavbarProps){
    return(
        <div className="flex items-center justify-between">
            <div className="w-[20%]">
                <img src="/logo.png" alt="Logo" className="w-[150px] ml-8 mt-4" />
            </div>
    
            <div className="navbar-links hidden md:flex w-[50%] text-lg mt-20">
                {/*LINKS*/}
                <div className="flex ml-[80px] gap-7">
                    <Link to="/pricing" className="flex items-center gap-1">
                        <img src="/home.png" alt="Homepage"className="w-5 h-5"/>
                        <span className="font-semibold">Homepage</span>
                    </Link>

                    <Link to="/pricing" className="flex items-center gap-1">
                        <img src="/friends.png" alt="Friends" className="w-5 h-5"/>
                        <span className="font-semibold">About</span>
                    </Link>

                    <Link to="/pricing" className="flex items-center gap-1">
                        <img src="/stories.png" alt="Stories" className="w-5 h-5"/>
                        <span className="font-semibold">Services</span>
                    </Link>

                    <Link to="/pricing" className="flex items-center gap-1">
                        <img src="/stories.png" alt="Stories" className="w-5 h-5"/>
                        <span className="font-semibold">Pricing</span>
                    </Link>
                </div>
            </div>

             {/*RIGHT*/}
             <div className="w-[30%]">
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        </div>
    )
}

export default Navbar;