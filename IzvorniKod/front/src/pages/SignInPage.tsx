import { Link } from 'react-router-dom';
import '../styles/SingInPage.css';
import { useState } from 'react';

const SignInPage = () => {
  const [input, setValue] = useState('')
  const [errorMessage, setEmailError] = useState('')
  const [bool1, setBool1] = useState(true)

  const [password, setPassword] = useState('')
  const [errorMessage2, setEmailError2] = useState('')
  const [bool2, setBool2] = useState(true)

  /*e je cijeli objekt i metapodaci tog inputa u formu 
  a e.target.value je tocno ono uneseno u input*/
  const inputOnChange = (e : any) => {
    setValue(e.target.value)
  }

  const passwordOnChange = (e : any) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e : any) => {
    /*ova funkcija sprecava refresh stranice nakon submit-anja form-a / klika na link / itd. */
    e.preventDefault()

    //regex za provjeru formata mail-a
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //.test() provjerava nalazi li se zadani uzorak i predanom stringu
    if (emailRegex.test(input)) {
      setBool1(true)
    } else {
      let counter = 0
      let tmp = input.split('') // split string na znakove radi provjere jesu li svi slovo/broj
      tmp.map(t => ( (/^[a-zA-Z0-9._]$/.test(t)) ? '' : counter++))

      // username je dobar ako su svi znakovi slovo/broj i prvi znak je slovo
      // ^[a-zA-Z]$/je regex za provjeru je li znak malo/veliko slovo
      // ^[a-zA-Z0-9._]$ je regex za slovo/broj/./_
      if(!counter && /^[a-zA-Z]$/.test(tmp[0])){
        setBool1(true)
      } else {
        setEmailError('Incorrect e-mail/username format')
        setBool1(false)
      }
    }

    if(password.length < 6){
      setEmailError2('Password must be longer then 6 characters')
      setBool2(false)
    } else{
      setBool2(true)
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

          <div className='buttons'>
            <button type="submit" className="btn1 mr-2">Sign in</button>
            <Link to={'/'}>
                <button className="close-btn">
                    Close
                </button>
            </Link>
          </div>

        </form><br />
      
        <span className='message'>Don't have an account? </span>
        <Link to={'/create-an-account'}>
          <button className='signUp'>Sign up</button>
        </Link>
       
      </div>
    </div>
  );
};

export default SignInPage;