import React from 'react';
import Title from './PricingCard/Title';
import Button from './PricingCard/Button';
import Feature from './PricingCard/Feature';
import Price from './PricingCard/Price';
import {Link} from "react-router-dom";


interface PricingCardProps {
    title: string;
    price: number;
    features: string[];
    isFeatureIncluded: boolean[];
    borderColor: string;
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
        <div className={`card ${borderColor}`}>
            <Title title={title} />
            <Price price={price} />
            <ul>
                {features.map((feature, index) => (
                    <Feature key={feature} included={isFeatureIncluded[index]} feature={feature} />
                ))}
            </ul>
            <Link to={'/create-an-account'}>
                <Button text={buttonText} />
            </Link>

        </div>
    );
};

export default PricingCard;
