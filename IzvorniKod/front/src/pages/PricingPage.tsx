import { features, pricingCards } from '../data/pricingData';
import PricingCard from '../components/PricingCard';
import '../styles/PricingPage.css';
import React from "react";
import Footer from "../components/Footer.tsx";

const PricingPage: React.FC = () => {
    return (
        <div className="Pricing bg-gray-700 pt-24">
            <h1>Pricing Table</h1>
            <div className="pricing-table">
                {pricingCards.map((card) => (
                    <PricingCard
                        key={card.price} // Consider using a unique ID instead of price if possible
                        title={card.title}
                        price={card.price}
                        features={features} // Ensure this is appropriate
                        isFeatureIncluded={card.isFeatureIncluded}
                        borderColor={card.borderColor as 'green' | 'bronze' | 'silver' | 'gold' | 'gray'} // Cast to the correct type
                        buttonText={card.buttonText}
                    />
                ))}
            </div>
            <div className="about bg-gray-700 pt-24">
                <Footer />
            </div>
        </div>
    );
};

export default PricingPage;
