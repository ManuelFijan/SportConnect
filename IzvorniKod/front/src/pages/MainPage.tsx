import '../styles/MainPage.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import defaultProfilePicture from '/user.png';
import ProfileCard from '../components/ProfileCard';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function MainPage() {
    const location = useLocation();
    const { user, fromSignIn, fromCreateAccount} = location.state || {};
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className="main-page text-white bg-gray-700 min-h-screen min-w-screen">
            {user ? (
                <div>
                    <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
                    <ProfileCard/>

                    <div className="ml-36 mt-20">

                        {fromSignIn && (
                            <h2 className={`text-xl font-bold ${isMenuOpen ? 'mt-[490px]' : 'mt-500px'}`}>
                                Welcome, {user.userName}! [{user.userType}, {user.subscriptionPlan}]
                            </h2>
                        )}
                        
                        {fromCreateAccount && (
                            <div className={`${isMenuOpen ? 'mt-[500px] mr-[40px]' : 'mt-[500px]'}`}>
                                <h2 className="text-xl font-bold">
                                    Welcome, {user.userName}! [{user.userType}, {user.subscriptionPlan}]
                                </h2>

                                <p className="font-bold">Your account has been created successfully.</p>
                            </div>
                        )}
                    </div>

                    <div className='top-right'>
                        <div>
                            <img src="./message1.png" alt="messageIcon" />
                        </div>
                        
                        <div className="dropdown">
                            <img
                                src={user.profilePicture || defaultProfilePicture}
                                className="profile"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                alt="User Icon"
                                style={{ cursor: 'pointer' }}
                            />
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item" href="/my-account">Profile</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>

    );
}

export default MainPage;