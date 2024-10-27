import { features, pricingCards } from '../data/pricingData';
import PricingCard from '../components/PricingCard';
import '../styles/PricingPage.css';
import React from "react";
import Footer from "../components/Footer.tsx";

const PricingPage: React.FC = () => {
    return (
        <div className="Pricing bg-gray-700 pt-24 min-h-screen min-w-screen">
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
            <div className="about bg-gray-700 pt-28 mt-4">
                <Footer />
            </div>
        </div>
    );
};

export default PricingPage;