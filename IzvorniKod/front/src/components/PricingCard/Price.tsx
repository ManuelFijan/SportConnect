import React from 'react';

interface PriceProps {
    price: number;
}

// vraca <p> element sa cijenom neke od 4 odredene pretplate, to se onda prikazuje na pricing page-u
const Price: React.FC<PriceProps> = ({ price }) => {
    return (
        <p className="price">
            ${price}{' '}
            <span className="month">
        / Month
      </span>
        </p>
    );
};

export default Price;