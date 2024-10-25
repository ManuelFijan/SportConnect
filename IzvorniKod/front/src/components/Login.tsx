import { Link, useLocation } from 'react-router-dom';

function Login() {
    const location = useLocation()
    const bool = location.pathname === '/sign-in'

    /*ako je putanja na /sign-in onda linkovi/gumbi koji su tada u pozadini
    nemaju funkcionalnost */
    return (
        <>
            <Link to={bool ? '' : "/sign-in"} className="">
                <button className="button-1" role="button">Sign in</button>
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
                <button className="button-2" role="button">Create an account</button>
            </Link>
        </>
    )
}

export default Login;