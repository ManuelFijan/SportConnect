import '../styles/Navbar.css'
import MobileMenu from "./MobileMenu";

function Navbar(){
    return(
        <div className="h-24 flex items-center justify-between">
            <div className="lg:block">
                <a href="/">
                    <img src="/aaa.jpg" alt="Logo" className=" w-[200px]"/>
                </a>
            </div>

            <div className="hidden md:flex w-[50%] text-sm">
                {/*LINKS*/}
                <div className="flex ml-[80px] gap-7 text-gray-600">
                    <a href="/" className="flex items-center gap-1">
                        <img src="/proba.jpg" alt="Homepage"className="w-[32px] h-[26px] -mt-[0.9px]"/>
                        <span className="font-semibold text-gold">Homepage</span>
                    </a>

                    <a href="/" className="flex items-center gap-1">
                        <img src="/friends.png" alt="Friends" className="w-4 h-5"/>
                        <span className="font-semibold text-gold">About</span>
                    </a>

                    <a href="/" className="flex items-center gap-1">
                        <img src="/stories.png" alt="Stories" className="w-4 h-4"/>
                        <span className="font-semibold text-gold">Services</span>
                    </a>

                    <a href="/" className="flex items-center gap-1">
                        <img src="/stories.png" alt="Stories" className="w-4 h-4"/>
                        <span className="font-semibold text-gold">Pricing</span>
                    </a>
                </div>
            </div>

             {/*RIGHT*/}
             <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
                <MobileMenu/>
            </div>

        </div>
    )
}

export default Navbar;