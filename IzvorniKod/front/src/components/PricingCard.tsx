import React from 'react';
import Title from './PricingCard/Title';
import Button from './PricingCard/Button';
import Feature from './PricingCard/Feature';
import Price from './PricingCard/Price';
import {Link} from "react-router-dom";

const getBorderColor = (color: 'bronze' | 'silver' | 'gold' | 'green' | 'gray'): string => {
    switch (color) {
        case 'bronze':
            return '#cd7f32'; // Bronze color
        case 'silver':
            return 'silver'; // Silver color
        case 'gold':
            return 'gold'; // Gold color
        case 'green':
            return 'green'; // Green color
        case 'gray':
            return 'gray'; // Gray color
        default:
            return 'transparent'; // Fallback if no match
    }
};


interface PricingCardProps {
    title: string;
    price: number;
    features: string[];
    isFeatureIncluded: boolean[];
    borderColor: 'bronze' | 'silver' | 'gold' | 'green' | 'gray'; // Updated to specific string literals
    buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
                                                     title,
                                                     price,
                                                     features,
                                                     isFeatureIncluded,
                                                     borderColor,
                                                     buttonText
                                                 }) => {
    return (
        <div
            className={`card ${borderColor}`}
            style={{ border: `2px solid ${getBorderColor(borderColor)}` }}
        >
            <Title title={title}/>
            <Price price={price}/>
            <ul>
                {features.map((feature, index) => (
                    <Feature key={feature} included={isFeatureIncluded[index]} feature={feature}/>
                ))}
            </ul>
            <Link to={'/create-an-account'}>
                <Button text={buttonText}/>
            </Link>
        </div>
    );
};

export default PricingCard;
