import '../styles/ProfileCard.css'
import { Link, useLocation } from 'react-router-dom';
import defaultProfilePicture from '/user.png';

function ProfileCard(){
    const location = useLocation()
    const {user} = location.state

    return (
        <div className='profile-container'>
            <img src="./profile-background.jpg" alt="background" className='img1'/>
            <img src={user.profilePicture || defaultProfilePicture} alt={`${user.userName}'s profile`} className='img2'/>
            <p>{user.firstName} {user.lastName}</p>
            <Link to="/my-account">
                <button className='button'>
                    My profile
                </button>
            </Link>
        </div>
    );
}

export default ProfileCard;