import '../styles/CreateAccountPage.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; //potrebno za redirect (navigiranje) na drugu stranicu
import Footer from '../components/Footer';

const api = "http://localhost:8080";  // base api-ja na backendu

function CreateAccountPage(){
    //kontrola formata imena
    const [name, setName] = useState('')
    const [errorMessage3, setNameError] = useState('')
    const [bool3, setBool3] = useState(true)

    //kontrola formata prezimena
    const [surname, setSurname] = useState('')
    const [errorMessage6, setSurnameError] = useState('')
    const [bool6, setBool6] = useState(true)

    //kontrola formata korisnickog imena
    const [username, setUsername] = useState('')
    const [errorMessage4, setUsernameError] = useState('')
    const [bool4, setBool4] = useState(true)

    //kontrola formata broja
    const [num, setNum] = useState('')
    const [errorMessage5, setNumError] = useState('')
    const [bool5, setBool5] = useState(true)
     
    //kontrola formata lozinke
    const [password, setPassword] = useState('')
    const [errorMessage2, setPasswordError] = useState('')
    const [bool2, setBool2] = useState(true)

    //kontrola formata e-maila
    const [email, setValue] = useState('')
    const [errorMessage, setEmailError] = useState('')
    const [bool1, setBool1] = useState(true)

    const navigate = useNavigate();
    
    /*e je cijeli objekt i metapodaci tog inputa u formu 
    a e.target.value je tocno ono uneseno u input,
    sve onChange funkcije sluze samo da kada u formi nesto unesemo
    da se promjeni vrijednost te varijable
    */
    const emailOnChange = (e : any) => {
        setValue(e.target.value)
    }

    const passwordOnChange = (e : any) => {
        setPassword(e.target.value)
    }

    const nameOnChange = (e : any) => {
        setName(e.target.value)
    }

    const surnameOnChange = (e : any) => {
        setSurname(e.target.value)
    }

    const usernameOnChange = (e : any) => {
        setUsername(e.target.value)
    }

    const numOnChange = (e : any) => {
        setNum(e.target.value)
    }

    //funkcija za trazenje pritisnutih gumba form-a
    function findChecked(name : any):string {
        let radios
        if(name === 'role'){
            // Selektiraj sve inpute(radio button ovdje) s imenom "role" unutar el. s id-om toggleForm1
            radios = document.querySelectorAll<HTMLInputElement>('#toggleForm1 input[name="role"]');
        } else {
            // Selektiraj sve inpute(radio button ovdje) s imenom "membership" unutar el. s id-om toggleForm2
            radios = document.querySelectorAll<HTMLInputElement>('#toggleForm2 input[name="membership"]');
        }
        
        let selectedValue = '';

        // Prolazimo kroz sve radio button-e i ako radio ima atribut checked true znaci da je oznacen
        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value; // Uzmi vrednost označenog radio button-a
            }
        });

        return selectedValue;
    }

    /*kada stisnemo submit na gumbu forme, ulazimo u ovu funkciju cija je funkcionalnost provjeriti podatke unesene
      u formu i ako je sve ok radi se fetch na backend
    */
    const handleSubmit = async (e : any) => {
        /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
        e.preventDefault()

        const btn_role = findChecked('role').toUpperCase()
        const btn_membership = findChecked('membership').toUpperCase()
        
        // kontrola jesu li svi formati inputa dobri
        // ne mozes koristit bool var. ranije navedene jer su one useState() te se
        // vrijednost promijeni tek sljedeci render, a ne odma kad u trenutku kad ih postavim njihovom fukcijom na drugu vrijed.
        let var1 = false, var2 = false, var3 = false, var4 = false, var5 = false, var6 = false

        //regex za provjeru formata mail-a
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //.test() provjerava nalazi li se zadani uzorak i predanom stringu
        if (emailRegex.test(email)) {
            setBool1(true)
            var1 = true
        } else {
            setEmailError('Incorrect e-mail format')
            setBool1(false)
        }

        //lozinka mora biti dulja od 6 znakova te moze biti bilo koja kombinacija slova/brojeva/specijalnih znakova
        if(password.length < 6){
            setPasswordError('Password must be longer then 6 characters')
            setBool2(false)
        } else{
            setBool2(true)
            var2 = true
        }

        //ime i prezime moraju pocinjat velikom slovom i sastojat se samo od slova te biti duljine barem 2
        let tmp1 = name.split('')
        if(/^[A-ZČĆŠĐŽ]+$/.test(tmp1[0]) && name.length > 1){
            let br = 0;
            tmp1.map(t => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            //ako je br 0 to znaci da ga nismo povecavali tj. svaki t se nalazio u zadanom regex-u
            if(br === 0){
                setBool3(true)
                var3 = true
            }
            else{
                setBool3(false)
                setNameError('Incorrect name format')
            } 
        } else {
            setBool3(false)
            setNameError('Incorrect name format')
        }

        let tmp2 = surname.split('')
        if(/^[A-ZŠČĆĐŽ]+$/.test(tmp2[0]) && surname.length > 1){
            let br = 0;
            tmp2.map(t => (/^[a-zA-ZČĆŠĐŽčćšđž]+$/.test(t) ? '' : br++))
            if(br === 0){
                setBool6(true)
                var6 = true
            }
            else{
                setBool6(false)
                setSurnameError('Incorrect surname format')
            } 
        } else {
            setBool6(false)
            setSurnameError('Incorrect surname format')
        }
        
        //korisnicko ime mora pocinjat slovom te dalje moze biti bilo koja kombinacija slova/brojeva/./_ te duljine barem 4
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

        // mobilni broj mora se sastojati od pozivnog broja drzave u formatu +(pa pozivni broj), npr. +385, +1, +43
        // zatim slijedi razmak pa ostatak mobilnog broja, npr. 0913452936 te taj dio mora biti dulji od 6 znamenki
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
        if (var1 && var2 && var3 && var4 && var5 && var6) {
            try {
              const response = await fetch(`${api}/users/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    firstName: name,
                    lastName: surname,
                    userName: username,
                    userType: btn_role,
                    subscriptionPlan: btn_membership,
                    mobileNumber: num
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
                if (data.emailError) {
                    setEmailError(data.emailError);  // postavljamo emailError za prikaz sign in page-a
                    setBool1(false);
                }
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
                    Create an account
                </h2>
                <p className='ml-2'>Join our community and</p>
                <p className='ml-2'>begin healthy lifestyle !</p>

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
                        
                            <input type="text" onChange={nameOnChange} placeholder="Name" className="form-control mt-3" maxLength={20} required/>
                            {bool3 ? '' : <div style={{ color: 'red' }}>{errorMessage3}</div>}
                            <input type="text" onChange={surnameOnChange} placeholder="Surname" className="form-control mt-3" maxLength={20} required/>
                            {bool6 ? '' : <div style={{ color: 'red' }}>{errorMessage6}</div>}
                            <input type="text" onChange={usernameOnChange} placeholder="Username" className="form-control mt-3" maxLength={20} required/>
                            {bool4 ? '' : <div style={{ color: 'red' }}>{errorMessage4}</div>}
                        </div>

                        <div className='right-container mr-2 '>
                            <input type="text" onChange={numOnChange} placeholder="Contact (mobile/telephone number)" className="form-control mt-3" maxLength={19} required/>
                            {bool5 ? '' : <div style={{ color: 'red' }}>{errorMessage5}</div>}
                            <input type="text" onChange={emailOnChange} placeholder="E-mail" className="form-control mt-3" maxLength={50} required/>
                            {bool1 ? '' : <div style={{ color: 'red' }}>{errorMessage}</div>}
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
  
export default CreateAccountPage;