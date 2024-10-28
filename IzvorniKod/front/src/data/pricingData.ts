const features = [

    'Education',
    'Connect with athletes',
    'View bronze content',
    'View silver content',
    'View gold content',
];

const pricingCards = [
    {

        title: 'Free',
        price: 0,
        isFeatureIncluded: [
            true,
            true,
            false,
            false,
            false,
        ],
        borderColor: 'green',
        buttonText: 'Get Started',
    },
    {

        title: 'Bronze',
        price: 15,
        isFeatureIncluded: [
            true,
            true,
            true,
            false,
            false,
        ],
        borderColor: 'bronze',
        buttonText: 'Get Started',
    },
    {
        title: 'Silver',
        price: 25,
        isFeatureIncluded: [
            true,
            true,
            true,
            true,
            false,
        ],
        borderColor: 'silver',
        buttonText: 'Get Started',
    },
    {
        title: 'Gold',
        price: 35,
        isFeatureIncluded: [
            true,
            true,
            true,
            true,
            true,
        ],
        borderColor: 'gold',
        buttonText: 'Get Started',
    },
];

export { features, pricingCards };