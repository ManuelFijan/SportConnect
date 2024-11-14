import '../styles/Homepage.css';
import Logo from "../components/Logo.tsx";
import Login from "../components/Login.tsx";
import Footer from "../components/Footer.tsx";
import SignInPage from './SignInPage.tsx';

import { useLocation } from 'react-router-dom';

function Homepage(){
    // saznaj je li url /sign-in
    const location = useLocation()
    const bool = location.pathname === '/sign-in'
 
    /*kada je url /sign-in onda dodamo prefix u imenu klase glavnog diva
    te u .css dat. pogodimo taj div i bluramo ga cijelog, a posto je bool = true onda
    se izrenderira nova komponenta koju fiksiramo na sredinu stranice*/
  return (
    <>
        <div className={(bool ? 'blur-' : '')+"container1 bg-gray-700 border-2 border-gray-500"}>
            <div className="flex">
                {/*LIJEVO - SLIKA*/}
                <div className="image w-50">
                    <Logo/>
                </div>
                {/*DESNO - LOGIN*/}
                <div className="login border-2 border-gray-700 w-50 flex flex-col items-center justify-center">
                    <h1 className="quote">One Day or Day One.</h1>
                    <h3 className="quote">Join now!</h3>
                    <Login/>
                </div>
            </div>

            {/*DOLE - ABOUT*/}
            <div className="about bg-gray-700 border-1 border-gray-700">
                <Footer/>
            </div>

        </div>

        {bool ? <SignInPage/> : null}
    </>    
  )
}

export default Homepage;