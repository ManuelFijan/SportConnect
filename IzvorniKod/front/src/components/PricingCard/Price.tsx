import React from 'react';

interface PriceProps {
    price: number;
    backgroundColor: string;
}

// vraca <p> element sa cijenom neke od 4 odredene pretplate, to se onda prikazuje na pricing page-u
const Price: React.FC<PriceProps> = ({ price, backgroundColor }) => {
    return (
        <p className="price" style={{ backgroundColor }}>
            ${price}{' '}
            <span className="month">
        / Month
      </span>
        </p>
    );
};

export default Price;