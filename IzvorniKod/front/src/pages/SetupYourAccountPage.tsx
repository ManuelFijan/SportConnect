import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CreateAccountPage.css';
import Footer from '../components/Footer'; 

// oblik varijable koji nam je potreban prilikom fetch-a na backend kako bi mogli dobiti podatke
interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    provider: string;
}

const api = "https://sportconnect-53p1.onrender.com";  // base api-ja na backendu

function SetupYourAccountPage(){
    const [userData, setUserData] = useState<UserData | null>(null);

    /*svaki put kada se refresh-a stranica fetch-amo backend kako bi dobili najaktualnije podatke
      dobivene preko google ili facebook sign in
    */
      useEffect(() => {
        fetch(`${api}/users/signedin`, { 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("User Info:", data);
                setUserData(data);
            })
            .catch(error => console.error("Error fetching user info:", error));
    }, []);

    //kontrola formata lozinke
    const [password, setPassword] = useState('')
    const [errorMessage2, setPasswordError] = useState('')
    const [bool2, setBool2] = useState(true)

    //kontrola formata korisnickog imena
    const [username, setUsername] = useState('')
    const [errorMessage4, setUsernameError] = useState('')
    const [bool4, setBool4] = useState(true)

    //kontrola formata broja
    const [num, setNum] = useState('')
    const [errorMessage5, setNumError] = useState('')
    const [bool5, setBool5] = useState(true)

    const navigate = useNavigate();
    
    //ove 3 funkcije sluze samo da promjenimo vrijednosti varijable kada se unese nesto u polje forme
    const passwordOnChange = (e : any) => {
        setPassword(e.target.value)
    }

    const usernameOnChange = (e : any) => {
        setUsername(e.target.value)
    }

    const numOnChange = (e : any) => {
        setNum(e.target.value)
    }

    /* ova funkcija sluzi da za gumbe gdje biramo jesmo li klijent ili partner, ili pak free/bronze/silver/gold
       vrati njihovu vrijednost (odnosno tekstualno ono što smo odabrali)
    */
    function findChecked(name : any):string {
        let radios
        if(name === 'role'){
            radios = document.querySelectorAll<HTMLInputElement>('#toggleForm1 input[name="role"]');
        } else {
            radios = document.querySelectorAll<HTMLInputElement>('#toggleForm2 input[name="membership"]');
        }
        
        let selectedValue = '';

        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value; 
            }
        });

        return selectedValue;
    }

    /*kada stisnemo submit na gumbu forme, ulazimo u ovu funkciju cija je funkcionalnost provjeriti podatke unesene
      u formu i ako je sve ok radi se fetch na backend
    */
    const handleSubmit = async (e : any) => {

        e.preventDefault()

        const btn_role = findChecked('role').toUpperCase()
        const btn_membership = findChecked('membership').toUpperCase()
        
        let var2 = false, var4 =false, var5 = false

        //provjera da je password dulji od 6 znakova
        if(password.length < 6){
            setPasswordError('Password must be longer then 6 characters')
            setBool2(false)
        } else{
            setBool2(true)
            var2 = true
        }
        
        // provjera username-a
        let tmp3 = username.split('')
        if(/^[a-zA-Z]$/.test(tmp3[0]) && username.length > 3){
            let br = 0;
            tmp3.map(t => (/^[a-zA-Z0-9._]$/.test(t) ? '' : br++))
            if(br === 0){
                setBool4(true)
                var4 = true
            }
            else{
                setBool4(false)
                setUsernameError('Incorrect username format')
            } 
        } else {
            setBool4(false)
            setUsernameError('Incorrect username format')
        }

        // provjera broja mobitela
        let tmp4 = num.split(' ')
        let tmp5 = tmp4[0].split('')
        if(tmp5[0] === '+' && isFinite(Number(tmp4[1])) && tmp4[1].length > 6 && !tmp4[1].includes('.')){
            tmp5[0] = '0'
            let br = 0
            tmp5.map(t => isFinite(Number(t)) ? '' : br++)
            if(br === 0 && tmp5[1] && tmp4[1]){
                setBool5(true)
                var5 = true
            } else {
                setBool5(false)
                setNumError('+(country_code)  phone_number')
            }
        } else {
            setBool5(false)
            setNumError('+(country_code)  phone_number')
        }

        //ako su svi podatci uneseni u formu dobrog oblika radi se fetch na backend kako bi registrirali korisnika
        if (var2 && var4 && var5) {
            try {
                const response = await fetch(`${api}/users/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData?.email,     // ovaj mali upitnik je da se makne error za possible null
                    password: password,
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    userName: username,
                    userType: btn_role,
                    subscriptionPlan: btn_membership,
                    mobileNumber: num,
                    profilePicture: userData?.profilePicture
                  }),
              });
        
              const data = await response.json();
        
              //ako je sve proslo ok, uspjesno smo registrirani i idemo na /main-page
              if (response.ok) {
                console.log('Register successful:', data);
                navigate('/main-page', { state: {user: data, fromCreateAccount: true} });
              } else {
                console.log(data);

                // ako nije sve proslo ok postavljamo error-e koje je backend vratio kako bi ih mogli ispisati
                if (data.userNameError) {
                    setUsernameError(data.userNameError);  //postavljamo userNameError za prikaz sign in page-a
                    setBool4(false);
                } 

                if(data.phoneNumberError){
                    setNumError(data.phoneNumberError);  //postavljamo phoneNumberError za prikaz sign in page-a
                    setBool5(false);
                }
              }

            } catch (error) {
              console.error('Error while register:', error);
            }
        }
    }

    // funckija za odselektiranje gumba ako drugi selektiramo
    function toggleActive(control : any){
        let labels;
        if(control === 1){
            labels = document.querySelectorAll('#toggleForm1 .btn') as NodeListOf<HTMLLabelElement>;
        } else{
            labels = document.querySelectorAll('#toggleForm2 .btn') as NodeListOf<HTMLLabelElement>;
        }
        
        labels.forEach(label => {
            label.onclick = () => {
            
            // Uklanja 'active' klasu sa svih labela
            labels.forEach(l => l.classList.remove('active'));
            
            // Dodaje 'active' klasu na kliknuti label
            label.classList.add('active');
            };
        });
    }

    return (
        <div className="create-acc-container bg-gray-700 min-h-screen min-w-screen">
            <div className='logopic'>
                <img src="/logo.png"/>
            </div>
            <div className='create-card'>
                <h2 className='ml-2'>
                    Finish creating your account!
                </h2>

                <p className='ml-2'>Fill in the rest of the fields</p>
                <p className='ml-2'>and join our community!</p>

                <form onSubmit={handleSubmit}>
                    <div className=' form-container mt-3'>
                        <div className='left-container'>
                            <div className="btn-group" role="group" aria-label="Toggle button group" id='toggleForm1'>
                                <label className="btn btn-outline-dark" onClick={() => toggleActive(1)}>
                                    <input type="radio" className="btn-check" name="role" value="Client" required/> Client
                                </label>

                                <label className="btn btn-outline-dark" onClick={() => toggleActive(1)}>
                                    <input type="radio" className="btn-check" name="role" value="Partner" required/> Partner
                                </label>
                            </div>
                        
                            <input type="text" value={userData ? userData.firstName : ''} className="form-control mt-3" readOnly/>
                            <input type="text" value={userData ? userData.lastName : ''} className="form-control mt-3" readOnly/>
                            <input type="text" onChange={usernameOnChange} placeholder="Username" className="form-control mt-3" maxLength={20} required/>
                            {bool4 ? '' : <div style={{ color: 'red' }}>{errorMessage4}</div>}
                        </div>

                        <div className='right-container mr-2 '>
                            <input type="text" onChange={numOnChange} placeholder="Contact (mobile/telephone number)" className="form-control mt-3" maxLength={19} required/>
                            {bool5 ? '' : <div style={{ color: 'red' }}>{errorMessage5}</div>}
                            <input type="text" value={userData ? userData.email : ''} className="form-control mt-3" readOnly/>
                            <input type="password" onChange={passwordOnChange} placeholder="Password" className="form-control mt-3" maxLength={20} required/>
                            {bool2 ? '' : <div style={{ color: 'red' }}>{errorMessage2}</div>}

                            <div className="btn-group mt-[0.8rem]" role="group" aria-label="Toggle button group" id='toggleForm2'>
                                <label className="btn btn-outline-dark" onClick={() => toggleActive(2)}>
                                    <input type="radio" className="btn-check" name="membership" value="Free" required/> Free 
                                </label>

                                <label className="btn btn-outline-dark" onClick={() => toggleActive(2)}>
                                    <input type="radio" className="btn-check" name="membership" value="Bronze" required/> Bronze 
                                </label>

                                <label className="btn btn-outline-dark" onClick={() => toggleActive(2)}>
                                    <input type="radio" className="btn-check" name="membership" value="Silver" required/> Silver 
                                </label>

                                <label className="btn btn-outline-dark" onClick={() => toggleActive(2)}>
                                    <input type="radio" className="btn-check" name="membership" value="Gold" required/> Gold   
                                </label>
                            </div>
                        </div>
                    </div>

                    <input type="checkbox" className='ml-2 mt-3' required/>
                        <p className='text-xs ml-7 mt-[-20px]'>
                            I have read and agree to SportConnect's <a href="/terms-of-service">Terms of Service </a>
                            and <a href="/privacy-policy">Privacy Policy</a> 
                        </p>
                                                       
                    
                    <div className='buttons ml-2'>
                        <button type="submit" className="btn1 mr-3">
                            Continue
                        </button>
                        <Link to={'/'}>
                            <button className="close-btn mr-2">
                                Close
                            </button>
                        </Link>
                    </div>

                </form>
                <br />
                <div className='link'>
                    <span className='message'>Already have an account? </span>
                    <Link to={'/sign-in'}>
                        <button className='signUp'> Sign in</button>
                    </Link>                
                </div>
            </div>
            <div className='picture'>
                <img src="./SignIn.png" alt="motivatePicture" />
            </div>

            <div className="about-create-page bg-gray-700">
                <Footer/>
            </div>
        </div>
    )  
}
  
export default SetupYourAccountPage;