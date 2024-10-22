function Login() {
    return (
        <>
            <button className="button-1" role="button">Sign in</button>


            <div className="flex ml-1.5 mt-1">
                <div className="bg-gray-500 w-[8rem] h-[1px] mt-[0.8rem]">
                </div>

                <div>
                    <p className="text-white pl-2 pr-2 mt-[0.1rem]">or</p>
                </div>

                <div className="bg-gray-500 w-[8rem] h-[1px] mt-[0.8rem]">
                </div>
            </div>

            <button className="button-2" role="button">Create an account</button>


        </>
    )
}

export default Login;