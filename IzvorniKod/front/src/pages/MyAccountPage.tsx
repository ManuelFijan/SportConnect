import { useLocation } from "react-router-dom";

function MyAccountPage(){
    const location = useLocation()
    const {user} = location.state || {}

    console.log("Tvoji podaci:")
    console.log(user)

    return (
        <div className="bg-gray-700 min-w-screen min-h-screen">
            <div className="bg-green-700 text-white h-[7rem]">
                <h2>MY ACCOUNT PAGE </h2>  
                <p>
                   Hello {user.firstName} {user.lastName}, you excellent catepilar &lt;3
                </p>             
            </div>
        </div>
    );
}

export default MyAccountPage;