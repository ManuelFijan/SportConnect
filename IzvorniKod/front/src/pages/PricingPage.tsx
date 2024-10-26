import { features, pricingCards } from '../data/pricingData';
import PricingCard from '../components/PricingCard';
import '../styles/global.scss';
import React from "react";
import Footer from "../components/Footer.tsx";




const PricingPage: React.FC = () => {

    return (
        <div className="Pricing bg-gray-700 pt-24">
            <h1>Pricing Table</h1>
            <div className="pricing-table">
                {pricingCards.map((card) => (
                    <PricingCard key={card.price} {...card} features={features} />
                ))}
            </div>
            <div className="about bg-gray-700 pt-24">
                <Footer/>
            </div>
        </div>
    );
};

export default PricingPage;