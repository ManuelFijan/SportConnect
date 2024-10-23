import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div className="footer-container">
                <Link to="/about-us" className="">
                    <p>About Us</p>
                </Link>

                <Link to="/terms-of-service" className="">
                    <p>Terms of Service</p>
                </Link>

                <Link to="/privacy-policy" className="">
                    <p>Privacy Policy</p>
                </Link>

                <Link to="/pricing" className="">
                    <p>Pricing</p>
                </Link>
                
                <Link to="/contact" className="">
                    <p>Contact</p>
                </Link>
            </div>
        </>
    )
}

export default Footer;