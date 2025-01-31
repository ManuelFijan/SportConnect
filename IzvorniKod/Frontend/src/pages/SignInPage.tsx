import { Link, useNavigate } from 'react-router-dom';
import '../styles/SingInPage.css';
import { useState, useContext } from "react";
import { AuthContext, User } from "../context/AuthContext"; // Import AuthContext

const SignInPage = () => {
  const { setToken, setUserEmail, setUser } = useContext(AuthContext); 

  const [input, setValue] = useState('')
  const [errorMessage, setEmailError] = useState('')
  const [bool1, setBool1] = useState(true)

  const [password, setPassword] = useState('')
  const [errorMessage2, setEmailError2] = useState('')
  const [bool2, setBool2] = useState(true)

  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const navigate = useNavigate()

  /*e je cijeli objekt i metapodaci tog inputa u formu 
  a e.target.value je tocno ono uneseno u input*/
  const inputOnChange = (e : any) => {
    setValue(e.target.value)
  }

  // kada se promjeni polje password, onda se varijabla koja prati njegovu vrijednost postavi ovdje
  const passwordOnChange = (e : any) => {
    setPassword(e.target.value)
  }

  /*kada stisnemo submit na gumbu forme, ulazimo u ovu funkciju cija je funkcionalnost provjeriti podatke unesene
    u formu i ako je sve ok radi se fetch na backend
  */
  const handleSubmit = async (e : any) => {
    /*ova funkcija sprjecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
    e.preventDefault()

    let var1 = false, var2 = false

    //regex za provjeru formata mail-a
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //.test() provjerava nalazi li se zadani uzorak i predanom stringu
    if (emailRegex.test(input)) {
      setBool1(true)
      var1 = true
    } else {
      let counter = 0
      let tmp = input.split('') // split string na znakove radi provjere jesu li svi slovo/broj
      tmp.map(t => ( (/^[a-zA-Z0-9._]$/.test(t)) ? '' : counter++))

      // username je dobar ako su svi znakovi slovo/broj i prvi znak je slovo
      // ^[a-zA-Z]$/je regex za provjeru je li znak malo/veliko slovo
      // ^[a-zA-Z0-9._]$ je regex za slovo/broj/./_
      if(!counter && /^[a-zA-Z]$/.test(tmp[0])){
        setBool1(true)
        var1 = true
      } else {
        setEmailError('Incorrect e-mail/username format')
        setServerErrorMessage('')  // ako je password manji od 6 znakova, makni error servera jer se tad sigurno ne ide u sign in
        setBool1(false)
      }
    }

    if(password.length < 6){
      setEmailError2('Password must be longer then 6 characters')
      setServerErrorMessage('')  // ako je password manji od 6 znakova, makni error servera jer se tad sigurno ne ide u sign in
      setBool2(false)
    } else{
      setBool2(true)
      var2 = true
    }

    //tek ako je sve dobrog formata radimo fetch podataka na backend
   if (var1 && var2) {
			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/users/login`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						identifier: input,
						password: password,
					}),
				});

				const data = await response.json();        

				if (response.ok) {
					console.log("Login successful:", data);

					// Spremi token i userEmail u AuthContext
					if (data.accessToken && data.user && data.user.email) {
						localStorage.setItem("token", data.accessToken);
						setToken(data.accessToken);

						localStorage.setItem("userEmail", data.user.email);
						setUserEmail(data.user.email);

						setUser(data.user as User); 

						// Odlazak na /main-page
            if(data.user.banned){
              navigate("/banned-page", {
                state: {
                  firstName: data.user.firstName,
                  lastName: data.user.lastName
                }
              });
            } else {
              navigate("/main-page", {
                state: {
                  user: data.user,
                  fromSignIn: true
                }
              });
            }
					} else {
						setServerErrorMessage("Invalid response from server.");
					}
				} else {
					if (data.error) {
						setServerErrorMessage(data.error);
					} else {
						setServerErrorMessage("Login failed. Please try again.");
					}
				}
			} catch (error) {
				console.error("Error logging in:", error);
				setServerErrorMessage("An error occurred during login.");
			}
		}
  }
  
  // prvi div unutar se ne smije zvat login jer vec imamo takvu klasu u Homepage-u pa se mijesa css(razlog proslog scroll problema)
  return (
    <div className="login-container">
      <div className="login2 w-[90%] ml-[-3.5rem] mt-[-2.5rem] xs:ml-0 xs:mt-0 xs:w-[30%]">
        <h2>
          Welcome back <img src="/party-popper.png" alt="welcome pic" className='pic w-7'/><br />
        </h2>
        <p>We've been missing you!</p>
        <p>Find out what's new.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" onChange={inputOnChange} placeholder="E-mail / username" className="form-control mt-3" maxLength={50} required/>
          {bool1 ? '' : <div style={{ color: 'red' }}>{errorMessage}</div>}
          <input type="password" onChange={passwordOnChange} placeholder="Password" className="form-control mt-3" maxLength={20} required/>
          {bool2 ? '' : <div style={{ color: 'red' }}>{errorMessage2}</div>}

          {serverErrorMessage && <div style={{ color: 'red' }}>{serverErrorMessage}</div>}

          <div className='buttons'>
            <button type="submit" className="btn1 mr-2">Sign in</button>
            <Link to={'/'}>
                <button className="close-btn">
                    Close
                </button>
            </Link>
          </div>

        </form><br />
      
        <div className='new-acc'>
          <span className='message'>Don't have an account? </span>
          <Link to={'/create-an-account'}>
            <button className='signUp'>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;