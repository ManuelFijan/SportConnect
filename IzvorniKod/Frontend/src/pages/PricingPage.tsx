import { features, pricingCards } from '../data/pricingData';
import PricingCard from '../components/PricingCard';
import '../styles/PricingPage.css';
import React from "react";
import Footer from "../components/Footer.tsx";
import { useLocation, Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
    const location = useLocation()
    let s = location.search
    const bool = s.includes("main")
    const bool2 = s.includes("acc")

    const {user} = useLocation().state || {}

    return (
        <div className="Pricing bg-gray-700 pt-24 min-w-screen min-h-screen">
            <h1>Pricing Table</h1>
            <div className="pricing-table">
                {pricingCards.map((card) => (
                    <PricingCard
                        key={card.price}
                        title={card.title}
                        price={card.price}
                        features={features}
                        isFeatureIncluded={card.isFeatureIncluded}
                        borderColor={card.borderColor as 'green' | 'bronze' | 'silver' | 'gold' | 'gray'}
                        buttonText={card.buttonText}
                    />
                ))}
            </div>
            
            {(bool || bool2) ? (
                <div className="about1 bg-gray-700 mt-28 ">
                    <Link to={bool ? "/main-page" : "/my-account"} state={{user, fromMainPage:true}}>
                    <button className='btn btn-secondary'>Back</button>
                    </Link>
                </div>
            ) : (
                <div className="about bg-gray-700 mt-28">
                    <Footer/>
                </div>
            )}
        </div>
    );
};

export default PricingPage;