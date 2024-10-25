import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation()
    const bool = location.pathname === '/sign-in'
    
    /*ako je putanja na /sign-in onda linkovi/gumbi koji su tada u pozadini
    nemaju funkcionalnost */
    return (
        <>
            <div className="footer-container">
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