import '../styles/ProfileMainCard.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import defaultProfilePicture from '/user.png';

function ProfileMainCard() {
    const location = useLocation();
    const { user } = location.state || {};

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        userName: user.userName || '',
        mobileNumber: user.mobileNumber || '',
        subscriptionPlan: user.subscriptionPlan || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const toggleEditForm = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated profile data:', formData);
        setIsEditing(false);
    };

    return (
        <div className='profile-container-main'>
            <img src="./profile-background.jpg" alt="background" className='img1-main' />
            <img src={user.profilePicture || defaultProfilePicture} alt={`${user.userName}'s profile`} className='img2-main' />
            <p>{user.firstName} {user.lastName}</p>
            <Link to="" state={{user}}>
                <button onClick={toggleEditForm} className='button-edit'>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </Link>

            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} className="edit-form">
                            <h2>Edit Profile</h2>
                            <div>
                                <label>Name:</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Surname:</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Username:</label>
                                <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Package:</label>
                                <input type="text" name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleInputChange} />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="button-save">Save Changes</button>
                                <button type="button" onClick={toggleEditForm} className="button-close">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileMainCard;
