import React from 'react';

interface TitleProps {
    title: string;
    backgroundColor: string;
}

// postavlja title od 4 kartice koje se prikazuju na pricing page
const Title: React.FC<TitleProps> = ({ title, backgroundColor }) => {
    return <h2 style={{ backgroundColor }}>{title}</h2>;
};

export default Title;