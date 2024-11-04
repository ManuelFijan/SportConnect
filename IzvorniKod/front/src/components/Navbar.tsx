import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/Navbar.css'
import MobileMenu from "./MobileMenu";
import { Link } from 'react-router-dom';


interface NavbarProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Navbar({ isOpen, setIsOpen }: NavbarProps){
    const [searchTerm, setSearchTerm] = useState('')
    const [placeholder, setPlaceholder] = useState('search...                     🔎')

    const onEnter = (event : any) => {
        if(event.key == 'Enter'){
            setSearchTerm(event.target.value)
            event.preventDefault()
        }
    }

    const handleChange = (event : any) => {
        if(event.target.value === '')
            setPlaceholder('search...                     🔎')
        else
            setPlaceholder(event.target.value)
    } 

    console.log(searchTerm);

    return(
        <div className="navbar-container">
            <div className="name">
                <h4><strong>SportConnect</strong></h4>
            </div>
    
            <div className="navbar-links hidden md:flex w-[70%] text-lg mt-20 justify-between">
                {/*LINKS*/}
                <div className="flex ml-[80px] gap-7">
                    <Link to="/" className="flex items-center gap-1">
                        <img src="/home1.png" alt="Homepage"className="w-5 h-5"/>
                        <span className="font-semibold">Homepage</span>
                    </Link>

                    <Link to="/about-us" className="flex items-center gap-1">
                        <img src="/friends1.png" alt="Friends" className="w-5 h-5"/>
                        <span className="font-semibold">About</span>
                    </Link>

                    <Link to="/terms-of-service" className="flex items-center gap-1">
                        <img src="/stories1.png" alt="Stories" className="w-5 h-5"/>
                        <span className="font-semibold">Services</span>
                    </Link>

                    <Link to="/pricing" className="flex items-center gap-1">
                        <img src="/stories1.png" alt="Stories" className="w-5 h-5"/>
                        <span className="font-semibold">Pricing</span>
                    </Link>   
                </div>

                <div className='search'>
                    <form className="d-flex" role="search">
                        <input
                            className="bg-gray-700 rounded-md text-white"
                            type="search"
                            onChange={handleChange}
                            placeholder={placeholder}
                            aria-label="Search"
                            onKeyDown={onEnter}
                        />
                    </form>
                </div>
            </div>

            <div className='search1'>
                    <form className="d-flex" role="search">
                        <input
                            className="bg-gray-700 rounded-md text-white"
                            type="search"
                            onChange={handleChange}
                            placeholder={placeholder}
                            aria-label="Search"
                            onKeyDown={onEnter}
                        />
                    </form>
                </div>

            {/*RIGHT*/}
            <div className="mobile-menu w-[30%]">
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
        </div>
    )
}

export default Navbar;