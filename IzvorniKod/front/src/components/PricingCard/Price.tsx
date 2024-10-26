import React from 'react';

interface PriceProps {
    price: number;
}

const Price: React.FC<PriceProps> = ({ price }) => {
    return (
        <p className="price">
            ${price}{' '}
            <span className="month">
        / Mo
      </span>
        </p>
    );
};

export default Price;
