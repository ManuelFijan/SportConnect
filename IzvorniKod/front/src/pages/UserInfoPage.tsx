import '../styles/UserInfoPage.css';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';

function UserInfoPage() {
    const location = useLocation();
    const { user, fromSignIn, fromCreateAccount } = location.state || {};
    const [isMenuOpen, setMenuOpen] = useState(false);

    console.log(user) // razlog zasto se ispis desi 2 puta je <StrictMode> u main.tsx, to je zbog sigurnosti da sve valja u kodu

    return (
        <div className="user-info-page text-white bg-gray-700 min-h-screen min-w-screen">
            {user ? (
                <div>
                    <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />

                    <div className="ml-36 mt-20">
                        {fromSignIn && (
                            <h2 className={`text-xl font-bold ${isMenuOpen ? 'mt-[480px]' : 'mt-0'}`}>
                                Welcome, {user.userName}! [{user.userType}, {user.subscriptionPlan}]
                            </h2>
                        )}
                        
                        {fromCreateAccount && (
                            <div className={`${isMenuOpen ? 'mt-[480px]' : 'mt-0'}`}>
                                <h2 className="text-xl font-bold">
                                    Welcome, {user.userName}! [{user.userType}, {user.subscriptionPlan}]
                                </h2>

                                <p className="font-bold">Your account has been created successfully.</p>
                            </div>
                        )}
                    </div>

                    <Link to="/" className="sign-out-button ml-8">
                        <button>Sign Out</button>
                    </Link>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
}

export default UserInfoPage;