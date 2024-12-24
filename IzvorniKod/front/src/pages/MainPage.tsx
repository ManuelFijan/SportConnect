import '../styles/MainPage.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import Feed from '../components/Feed';
import AddPost from '../components/AddPost'
import 'bootstrap/dist/js/bootstrap.bundle.min';

const api = "http://localhost:8080";  // base api-ja na backendu

function MainPage() {
    const location = useLocation();
    const { user, fromSignIn, fromCreateAccount, fromMainPage} = location.state || {};
    const [isMenuOpen, setMenuOpen] = useState(false);

    const [updatedUser, setUpdatedUser] = useState(user);

    /* preko email-a user-a dohvaćamo najaktualnije podatke tog user-a (jer se email ne može promijeniti, to je kao id)
       i nakon toga dobivene podatke stavljamo u varijablu UpdatedUser kako bi ih mogli prikazati na page-u
    */
    useEffect(() => {
            fetch(`${api}/users/get-information/${user.email}`)
                .then(response => response.json())
                .then(data => {
                    setUpdatedUser(data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    , []);

    return (
        <div className="main-page text-white bg-gray-700 min-h-screen min-w-screen">
            {user ? (
                <div>
                    <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} userPic={updatedUser}/>

                    <div className='body-main-page'>
                        <div className='left-div-main-page'>
                            <ProfileCard/>
                        </div>

                        <div className='middle-div-main-page flex flex-col justify-center items-center'>
                            <AddPost/>
                            <Feed user={updatedUser}/>
                            <div className="ml-36 mt-20">

                                {(fromSignIn || fromMainPage) && (
                                    <h2 className={`text-xl font-bold ${isMenuOpen ? 'mt-[490px]' : ''}`}>
                                        Welcome, {updatedUser.userName}! [{updatedUser.userType}, {updatedUser.subscriptionPlan}]
                                    </h2>
                                )}
                                
                                {fromCreateAccount && (
                                    <div className={`${isMenuOpen ? 'mt-[500px] mr-[40px]' : ''}`}>
                                        <h2 className="text-xl font-bold">
                                            Welcome, {updatedUser.userName}! [{updatedUser.userType}, {updatedUser.subscriptionPlan}]
                                        </h2>

                                        <p className="font-bold">Your account has been created successfully.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='right-div-main-page'>
                            <p className='mt-9'>RIGHT DIV</p>
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