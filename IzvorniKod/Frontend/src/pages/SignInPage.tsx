import { Link, useNavigate } from 'react-router-dom';
import '../styles/SingInPage.css';
import { useState } from 'react';

const api = "https://sportconnect-531910440961.europe-west3.run.app";  // base api-ja na backendu

const SignInPage = () => {
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
        const response = await fetch(`${api}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: input,
            password: password,
          }),
        });
      
        const data = await response.json();
      
        //ako je odgovor sa statusom ok, uspjesno smo logirani i idemo na /main-page
        if (response.ok) {
          console.log('Login successful:', data);
          navigate('/main-page', { state: { user: data.user, fromSignIn: true}});
        } else {
          console.log(data);

          if(data.error){
            setServerErrorMessage(data.error);  // ako dode do greske kod login-a, postavimo error koji se kasnije ispise
          }
        }

      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
  
  // prvi div unutar se ne smije zvat login jer vec imamo takvu klasu u Homepage-u pa se mijesa css(razlog proslog scroll problema)
  return (
    <div className="login-container">
      <div className="login2">
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