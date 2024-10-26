import React from 'react';

interface FeatureProps {
    included: boolean;
    feature: string;
}

const Feature: React.FC<FeatureProps> = ({ included, feature }) => {
    return (
        <li>
            {included ? <span className="icon-check">&#10003;</span> : <span className="icon-cross">&#10060;</span>}
            {feature}
        </li>
    );
};

export default Feature;