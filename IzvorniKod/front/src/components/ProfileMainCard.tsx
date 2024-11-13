import '../styles/ProfileMainCard.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultProfilePicture from '/user.png';

const api = "https://sportconnect-backend.onrender.com";  // base api-ja na backendu

function ProfileMainCard() {
    const location = useLocation();
    const { user } = location.state || {};
    const [updatedUser, setUpdatedUser] = useState(user);
    const [formData, setFormData] = useState(user)

    const [isEditing, setIsEditing] = useState(false);

    const [firstNameError, setFirstNameError] = useState('')
    const [bool3, setBool3] = useState(true)

    const [lastNameError, setLastNameError] = useState('')
    const [bool4, setBool4] = useState(true)

    const [errorMessage1, setUsernameError] = useState('')
    const [bool1, setBool1] = useState(true)

    const [errorMessage2, setNumError] = useState('')
    const [bool2, setBool2] = useState(true)

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

    // ako se promjene podatci unutar forme ova funkcija prode po svim unosima i samo update-a podatke u varijabli formData
    const handleInputChange = (e : any) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const toggleEditForm = () => {
        // svaki put kada ponovo otvorimo ili zatvorimo formu, u nju stavimo najnovijeg user-a i postavimo bools na true jer nema errora
        // u smislu ovo je kao refresh forme
        setIsEditing(!isEditing);  
        setFormData(updatedUser);
        setBool1(true);
        setBool2(true);
        setBool3(true);
        setBool4(true);
    };

    // kada stisnemo gumb submit na formi onda ulazimo u ovu funkciju koja sluzi u ovom slucaju da update-amo podatke user-a
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let var1 = false, var2 = false, var3 = false, var4 = false

        // provjeravamo format imena
        let tmp1 = formData.firstName.split('')
        if(/^[A-ZČĆŠĐŽ]+$/.test(tmp1[0]) && tmp1.length > 1){
            let br = 0;
            tmp1.map((t: string) => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            //ako je br 0 to znaci da ga nismo povecavali tj. svaki t se nalazio u zadanom regex-u
            if(br === 0){
                setBool3(true)
                var3 = true
            }
            else{
                setBool3(false)
                setFirstNameError('Incorrect name format')
            } 
        } else {
            setBool3(false)
            setFirstNameError('Incorrect name format')
        }

        // provjeravamo format prezimena
        let tmp2 = formData.lastName.split('')
        if(/^[A-ZČĆŠĐŽ]+$/.test(tmp2[0]) && tmp2.length > 1){
            let br = 0;
            tmp2.map((t: string) => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            if(br === 0){
                setBool4(true)
                var4 = true
            }
            else{
                setBool4(false)
                setLastNameError('Incorrect surname format')
            } 
        } else {
            setBool4(false)
            setLastNameError('Incorrect surname format')
        }

        // provjera formata username-a
        let tmp3 = formData.userName.split('')
        if(/^[a-zA-Z]$/.test(tmp3[0]) && tmp3.length > 3){
            let br = 0;
            tmp3.map((t: string) => (/^[a-zA-Z0-9._]$/.test(t) ? '' : br++))
            if(br === 0){
                setBool1(true)
                var1 = true
            }
            else{
                setBool1(false)
                setUsernameError('Incorrect username format')
            } 
        } else {
            setBool1(false)
            setUsernameError('Incorrect username format')
        }

        // provjera formata broja mobitela
        let tmp4 = formData.mobileNumber.split(' ')
        let tmp5 = tmp4[0].split('')
        if(tmp5[0] === '+' && isFinite(Number(tmp4[1])) && tmp4[1].length > 6 && !tmp4[1].includes('.')){
            tmp5[0] = '0'
            let br = 0
            tmp5.map((t: any) => isFinite(Number(t)) ? '' : br++)
            if(br === 0 && tmp5[1] && tmp4[1]){
                setBool2(true)
                var2 = true
            } else {
                setBool2(false)
                setNumError('+(country_code)  phone_number')
            }
        } else {
            setBool2(false)
            setNumError('+(country_code)  phone_number')
        }
    
        /* ako je su svi podatci dobrog formata radimo fetch na backend preko mail-a user-a (to je kao id)
           prema primljenom mail-u backend update-a podatke i vrati ih
        */
        if(var1 && var2 && var3 && var4){
            try {
                const response = await fetch(`${api}/users/update?email=${(user.email)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        userName: formData.userName,
                        mobileNumber: formData.mobileNumber,
                        subscriptionPlan: formData.subscriptionPlan
                      }),
                });
        
                const data = await response.json();
    
                /* ako je odgovor od backend-a vracen sa statusom ok, postavimo podatke u updatedUser i varijablu koja prati
                   da li trenutno editamo page ili ne na suprotnu vrijednost od one koja je bila
                */
                if (response.ok) {
                    setUpdatedUser(data)
                    setIsEditing(!isEditing) // ako je proslo vise se ne edit-a i sigurno nema error-a
                } else {
    
                    // inace ostajemo u edit prozoru i postavljamo koji vec error treba 
    
                    if (data.userNameError) {
                        setUsernameError(data.userNameError);  //postavljamo userNameError za prikaz 
                        setBool1(false);
                    } 
    
                    if(data.phoneNumberError){
                        setNumError(data.phoneNumberError);  //postavljamo phoneNumberError za prikaz
                        setBool2(false);
                    }
    
                }
            } catch (error) {
                console.error('Error while updating user:', error);
            }
        }
    };
    

    return (
        <div className='profile-container-main'>
            <img src="./profile-background.jpg" alt="background" className='img1-main' />
            <img src={updatedUser.profilePicture || defaultProfilePicture} alt={`${updatedUser.userName}'s profile`} className='img2-main' />
            <p>{updatedUser.firstName} {updatedUser.lastName}</p>

            <button onClick={toggleEditForm} className='button-edit'>
                Edit Profile
            </button>


            {isEditing && (
                <div className="modal-overlay bg-gray-700 bg-opacity-80">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit} className="edit-form">
                            <h2>Edit Profile</h2>
                            <div>
                                <label>Name:</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                {bool3 ? '' : <div style={{ color: 'red', fontWeight: 'bold'}}>{firstNameError}</div>}
                            </div>
                            <div>
                                <label>Surname:</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                {bool4 ? '' : <div style={{ color: 'red', fontWeight: 'bold'}}>{lastNameError}</div>}
                            </div>
                            <div>
                                <label>Username:</label>
                                <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} />
                                {bool1 ? '' : <div style={{ color: 'red', fontWeight: 'bold'}}>{errorMessage1}</div>}
                            </div>
                            <div>
                                <label>Phone Number:</label>
                                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} />
                                {bool2 ? '' : <div style={{ color: 'red', fontWeight: 'bold'}}>{errorMessage2}</div>}
                            </div>
                            <div>
                                <label>Package:</label>
                                <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleInputChange}>
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