import { features, pricingCards } from '../data/pricingData';
import PricingCard from '../components/PricingCard';
import '../styles/PricingPage.css';
import React, { useContext } from "react";
import Footer from "../components/Layout/Footer.tsx";
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.tsx';

const PricingPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    let s = location.search;
    const bool = s.includes("main");
    const bool2 = s.includes("acc");
    const bool3 = s.includes("chat");

    const { message1 } = location.state || {};
    const { message2 } = location.state || {};

    // Definiramo razine pretplate
    const subscriptionLevels = {
        'FREE': 0,
        'BRONZE': 1,
        'SILVER': 2,
        'GOLD': 3
    } as const;

    // inicijalno nivo (pretplatu user-a postavimo na FREE = 0)
    let userLevel: number = 0;

    if (user) {
        // zatim po njegovoj stvarnoj pretplati dohvatimo koja je razina
        userLevel = subscriptionLevels[user.subscriptionPlan as keyof typeof subscriptionLevels];
    }

    // Filtriramo kartice tako da se pokazuju samo one kojima je nivo veci od
    const filteredPricingCards = pricingCards.filter(card => 
        subscriptionLevels[card.title.toUpperCase() as keyof typeof subscriptionLevels] > userLevel
    );

    const formatPlanName = (plan: string) => {
        return plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase();
    };

    const initiatePayment = (selectedCardTitle: string) => {
        if (!user) return;
    
        // Prvo slozimo format nase pretplate tako da pocne velikim slovom a dalje mala slova, to radi funkcija formatPlanName
        const formattedPlan = formatPlanName(user.subscriptionPlan);

        // Nakon toga slozimo cijeli string za sto placamo (prijelaz sa nase razine na odabranu)
        const paymentItemName = `${formattedPlan} to ${selectedCardTitle}`;
    
        // Za kraj samo slozimo id prema paymentItemName
        let productId: string = "";

        if (paymentItemName === "Free to Bronze") {
            productId = "free1";
        } else if (paymentItemName === "Free to Silver") {
            productId = "free2";
        } else if (paymentItemName === "Free to Gold") {
            productId = "free3";
        } else if (paymentItemName === "Bronze to Silver") {
            productId = "bronze1";
        } else if (paymentItemName === "Bronze to Gold") {
            productId = "bronze2";
        } else if (paymentItemName === "Silver to Gold") {
            productId = "silver1";
        } else {
            console.error("No matching product found for payment item name: " + paymentItemName);
        }
        
        fetch(`${import.meta.env.VITE_BACKEND_API}/checkout/hosted`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: [{ name: paymentItemName, id: productId }], // saljemo ime pretplate i id
                customerName: user.userName,
                customerEmail: user.email,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to initiate payment");
                }
                return response.text();
            })
            .then((url) => {
                console.log(url);
                window.location.href = url; 
            })
            .catch((error) => {
                console.error("Payment initiation error:", error);
            });
    };

    return (
        <div className="Pricing bg-gray-700 pt-24 min-w-screen min-h-screen">
            <h1>
                {message1 ? 'Available subscriptions' : 'Pricing Table'}
            </h1>

            {message1 && (
                <>
                    <h4 className="text-white">
                        {message1}
                    </h4>

                    <h4 className="text-white mb-4 mt-2">
                        {message2}
                    </h4>
                </>
            )}

            <div className="pricing-table">
            {message1 ? (
                filteredPricingCards.map((card) => (
                <PricingCard
                    key={card.price}
                    title={card.title}
                    price={card.price}
                    features={features}
                    isFeatureIncluded={card.isFeatureIncluded}
                    borderColor={card.borderColor as 'green' | 'bronze' | 'silver' | 'gold' | 'gray'}
                    buttonText={card.buttonText}
                    onClick={() => initiatePayment(card.title)}
                    isFiltered={true} // da znamo da gumb GET STARTED mora ostati
                />
                ))
            ) : (
                pricingCards.map((card) => (
                <PricingCard
                    key={card.price}
                    title={card.title}
                    price={card.price}
                    features={features}
                    isFeatureIncluded={card.isFeatureIncluded}
                    borderColor={card.borderColor as 'green' | 'bronze' | 'silver' | 'gold' | 'gray'}
                    buttonText={card.buttonText}
                    onClick={() => initiatePayment(card.title)}
                    isFiltered={false} // da znamo da gumb GET STARTED moramo maknuti
                />
                ))
            )}
            </div>


            {message1 ? (
                <div className="about1 bg-gray-700 mt-10 mb-3">
                    <Link to="/my-account" state={{ user, fromMainPage: true }}>
                        <button className="btn btn-secondary">Back</button>
                    </Link>
                </div>
            ) : (
                (bool || bool2 || bool3) ? (
                    <div className="about1 bg-gray-700 mt-32">
                        <Link 
                            to={bool 
                                    ? "/main-page" 
                                    : bool2 
                                    ? "/my-account" 
                                    : "/chat"
                            } 
                            state={{ user, fromMainPage: true }}
                        >
                            <button className="btn btn-secondary">Back</button>
                        </Link>
                    </div>
                ) : (
                    <div className="about bg-gray-700 mt-28">
                        <Footer />
                    </div>
                )
            )}
        </div>
    );
};

export default PricingPage;