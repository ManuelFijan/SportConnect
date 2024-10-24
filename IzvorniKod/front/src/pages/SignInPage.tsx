import { Link } from 'react-router-dom';
import '../styles/SingInPage.css';

const SignInPage = () => {
  

  return (
    <div className="login-container">
      <div className="login2">
        <h2>
          Welcome back <img src="/public/party-popper.png" alt="welcome pic" className='pic w-7'/><br />
        </h2>
        <p>We've been missing you!</p>
        <p>Find out what's new.</p>

        <form>
          <input type="text" placeholder="E-mail / username" className="form-control" required/>
          <input type="password" placeholder="Password" className="form-control mt-2" required/>

          <div className='buttons'>
            <button type="submit" className="btn1">Sign in</button>
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
