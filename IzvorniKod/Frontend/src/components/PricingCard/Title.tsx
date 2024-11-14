import React from 'react';

interface TitleProps {
    title: string;
}

// postavlja title od 4 kartice koje se prikazuju na pricing page
const Title: React.FC<TitleProps> = ({ title }) => {
    return <h2>{title}</h2>;
};

export default Title;
