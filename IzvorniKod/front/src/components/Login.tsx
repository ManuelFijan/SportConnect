import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <Link to="/sign-in" className="">
                <button className="button-1" role="button">Sign in</button>
            </Link>

            <div className="flex ml-1.5 mt-1">
                <div className="crta bg-gray-500  h-[1px] mt-[0.8rem]">
                </div>

                <div>
                    <p className="text-white pl-2 pr-2 mt-[0.1rem]">or</p>
                </div>

                <div className="crta bg-gray-500 h-[1px] mt-[0.8rem]">
                </div>
            </div>

            <Link to="/create-an-account" className="">
                <button className="button-2" role="button">Create an account</button>
            </Link>
        </>
    )
}

export default Login;