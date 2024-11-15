import React from 'react';
import Title from './PricingCard/Title';
import Button from './PricingCard/Button';
import Feature from './PricingCard/Feature';
import Price from './PricingCard/Price';
import {Link} from "react-router-dom";

// vraca boju za bronze, silver, itd.
const getBorderColor = (color: 'bronze' | 'silver' | 'gold' | 'green' | 'gray'): string => {
    switch (color) {
        case 'bronze':
            return '#cd7f32';
        case 'silver':
            return 'silver';
        case 'gold':
            return 'gold';
        case 'green':
            return 'green';
        case 'gray':
            return 'gray';
        default:
            return 'transparent';
    }
};

interface PricingCardProps {
    title: string;
    price: number;
    features: string[];
    isFeatureIncluded: boolean[];
    borderColor: 'bronze' | 'silver' | 'gold' | 'green' | 'gray';
    buttonText: string;
}

// vraca pricing card koji je sastavljen od ostalih komponenata za pricing card
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
            <ul className="features-pricing-list">
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