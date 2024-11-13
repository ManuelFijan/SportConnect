import { Link, useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation()
    const bool = location.pathname === '/sign-in'

    const api = "https://sportconnect-iq3d.onrender.com";  // base api-ja na backendu

    /*ako je putanja na /sign-in onda linkovi/gumbi koji su tada u pozadini 
    nemaju funkcionalnost */
    return (
        <>
            <Link to={bool ? '' : `${api}/oauth2/authorization/google`} className="">
                <button className={bool ? "sign-button-1" : "button-1"} role="button">
                    <div className='flex justify-center space-x-3'>
                        <img src="./google-logo.png" alt="" className='w-6'/>
                        <div>
                            Sign up with Google
                        </div>
                    </div>          
                </button>
            </Link>

            <Link to={bool ? '' : `${api}/oauth2/authorization/facebook`} className="mt-[-1.3rem]">
                <button className={bool ? "sign-button-4 " : "button-4"} role="button">
                    <div className='flex justify-center space-x-3 ml-4'>
                        <img src="./facebook-logo.webp" alt="" className='w-7'/>
                        <div className='mt-[2px]'>
                            Sign up with Facebook
                        </div>
                    </div> 
                </button>
            </Link>

            <div className="flex ml-1.5 mt-1">
                <div className="line bg-gray-500  h-[1px] mt-[0.8rem]">
                </div>

                <div>
                    <p className="text-white pl-2 pr-2 mt-[0.1rem]">or</p>
                </div>

                <div className="line bg-gray-500 h-[1px] mt-[0.8rem]">
                </div>
            </div>

            <Link to={bool ? '' : "/create-an-account"} className="">
                <button className={bool ? "sign-button-2" : "button-2"} role="button">Create an account</button>
            </Link>

            <div className='already-text'>Already have an account?</div>
            <Link to={bool ? '' : "/sign-in"} className="">
                <button className={bool ? "sign-button-3" : "button-3"} role="button">Sign in</button>
            </Link>
            <br />
        </>
    )
}

export default Login;