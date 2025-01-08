import React from 'react';
import Title from './PricingCard/Title';
import Feature from './PricingCard/Feature';
import Price from './PricingCard/Price';

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

const getLighterColor = (color: 'bronze' | 'silver' | 'gold' | 'green' | 'gray'): string => {
    let baseColor = '';
    switch (color) {
        case 'bronze':
            baseColor = '#fad0b3';  
            break;
        case 'silver':
            baseColor = '#f3f3f3';  
            break;
        case 'gold':
            baseColor = '#fff6d2';  
            break;
        case 'green':
            baseColor = '#e6ffdc'; 
            break;
        case 'gray':
            baseColor = 'gray';
            break;
        default:
            baseColor = 'transparent';
    }

    return baseColor; 
};

interface PricingCardProps {
    title: string;
    price: number;
    features: string[];
    isFeatureIncluded: boolean[];
    borderColor: 'bronze' | 'silver' | 'gold' | 'green' | 'gray';
    buttonText: string;
    onClick: () => void;
    isFiltered: boolean;
}

// vraca pricing card koji je sastavljen od ostalih komponenata za pricing card
const PricingCard: React.FC<PricingCardProps> = ({
                                                     title,
                                                     price,
                                                     features,
                                                     isFeatureIncluded,
                                                     borderColor,
                                                     buttonText,
                                                     onClick,
                                                     isFiltered
                                                }) => {

    const backgroundColor = getLighterColor(borderColor);

    return (
        <div
            className={`card ${borderColor}`}
            style={{ 
                border: `3px solid ${getBorderColor(borderColor)}` ,
                backgroundColor
            }}
        >
            <Title title={title} backgroundColor={backgroundColor}/>
            <Price price={price} backgroundColor={backgroundColor}/>
            <ul className="features-pricing-list">
                {features.map((feature, index) => (
                    <Feature key={feature} included={isFeatureIncluded[index]} feature={feature}/>
                ))}
            </ul>
            {/* Gumb prikazujemo samo ako je isFiltered true*/}
            {isFiltered && <button onClick={onClick}>{buttonText}</button>}
        </div>
    );
};

export default PricingCard;