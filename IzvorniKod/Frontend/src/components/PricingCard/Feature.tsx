import React from 'react';

interface FeatureProps {
    included: boolean;
    feature: string;
}

/* funkcija koja postavlja koji feature je ukljucen u pojedinu pretplatu (free/bronze/silver/gold) na pricing page-u
   i onda vrati tu listu sa features
*/
const Feature: React.FC<FeatureProps> = ({ included, feature }) => {
    return (
        <li>
            {included ? <span className="icon-check">&#10003;</span> : <span className="icon-cross">&#10060;</span>}
            {feature}
        </li>
    );
};

export default Feature;