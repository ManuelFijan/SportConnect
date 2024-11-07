import '../styles/ProfileMainCard.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultProfilePicture from '/user.png';

function ProfileMainCard() {
    const location = useLocation();
    const { user } = location.state || {};

    const [isEditing, setIsEditing] = useState(false);
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

    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setUpdatedUser((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const toggleEditForm = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:8080/users/update?email=${(user.email)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    userName: updatedUser.userName,
                    mobileNumber: updatedUser.mobileNumber,
                    subscriptionPlan: updatedUser.subscriptionPlan 
                  }),
            });
    
            const data = await response.json();

            if (response.ok) {
                console.log('User updated successfully:', data);
            } else {
                //dovrsi dio za username i mobile number
            }
        } catch (error) {
            console.error('Error while updating user:', error);
        }
    
        setIsEditing(false);
    };
    

    return (
        <div className='profile-container-main'>
            <img src="./profile-background.jpg" alt="background" className='img1-main' />
            <img src={updatedUser.profilePicture || defaultProfilePicture} alt={`${updatedUser.userName}'s profile`} className='img2-main' />
            <p>{updatedUser.firstName} {updatedUser.lastName}</p>
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
                                <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Surname:</label>
                                <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Username:</label>
                                <input type="text" name="userName" value={updatedUser.userName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input type="text" name="mobileNumber" value={updatedUser.mobileNumber} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Package:</label>
                                <select name="subscriptionPlan" value={updatedUser.subscriptionPlan} onChange={handleInputChange}>
                                    <option value="FREE">FREE</option>
                                    <option value="BRONZE">BRONZE</option>
                                    <option value="SILVER">SILVER</option>
                                    <option value="GOLD">GOLD</option>
                                </select>
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
