import React from 'react';

interface ButtonProps {
    text: string;
}

// postavlja text koji se nalazi u buttonu na pricing page-u
const Button: React.FC<ButtonProps> = ({ text }) => {
    return <button>{text}</button>;
};

export default Button;