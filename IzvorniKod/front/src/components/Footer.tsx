import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation()
    const bool = location.pathname === '/sign-in'
    const bool2 = (location.pathname === '/') || (location.pathname === '/sign-in')


    /*ako je putanja na /sign-in onda linkovi/gumbi koji su tada u pozadini
    nemaju funkcionalnost */

    /*ako je putanja na / onda ne prikazuj gumbic sa home */
    return (
        <>
            <div className="footer-container">
                <div className={(bool2 ? 'no-home-button' : 'home-button')}>
                    <Link to={bool ? '' : "/"}>
                        <button>🏠</button>
                    </Link>
                </div>

                <Link to={bool ? '' : "/about-us"} className="">
                    <p>About Us</p>
                </Link>

                <Link to={bool ? '' : "/terms-of-service"} className="">
                    <p>Terms of Service</p>
                </Link>

                <Link to={bool ? '' : "/privacy-policy"} className="">
                    <p>Privacy Policy</p>
                </Link>

                <Link to={bool ? '' : "/pricing"} className="">
                    <p>Pricing</p>
                </Link>
                
                <Link to={bool ? '' : "/contact"} className="">
                    <p>Contact</p>
                </Link>
            </div>
        </>
    )
}

export default Footer;