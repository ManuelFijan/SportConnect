import '../styles/ProfileCard.css'
import { Link, useLocation } from 'react-router-dom';
import defaultProfilePicture from '/user.png';
import { useEffect, useState } from 'react';

function ProfileCard(){
    const location = useLocation()
    const {user} = location.state || {}

    const [updatedUser, setUpdatedUser] = useState(user);

    useEffect(() => {
            fetch(`http://localhost:8080/users/get-information/${user.email}`)
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
        <div className='profile-container'>
            <img src="./profile-background.jpg" alt="background" className='img1'/>
            <img src={updatedUser.profilePicture || defaultProfilePicture} alt={`${updatedUser.userName}'s profile`} className='img2'/>
            <p>{updatedUser.firstName} {updatedUser.lastName}</p>
            <Link to="/my-account" state={{user}}>
                <button className='button'>
                    My profile
                </button>
            </Link>
        </div>
    );
}

export default ProfileCard;