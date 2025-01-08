import Navbar from "../components/Layout/Navbar.tsx";
import { useState, useContext } from "react";
import ProfileMainCard from "../components/ProfileMainCard.tsx";
import { AuthContext } from "../context/AuthContext";
import Feed from "../components/Posts/Feed.tsx";
import { Link } from "react-router-dom";

function MyAccountPage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext); //Pristupanje user-u iz AuthContext

  //Ako se jos load-a user samo neki loading screen
	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-white text-xl">Loading user data...</p>
			</div>
		);
	}

  return (
    <div className="bg-gray-700 min-w-screen min-h-screen">
      <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} userPic={user.profilePicture || "/user.png"} />
      {!isMenuOpen && (
        <div className="flex justify-center align-items-top py-2">
          <div className="bg-gray-700 w-[25%] flex flex-col items-center pt-2">
            <h3>Left Section</h3>
            <p>Content for the left section.</p>
          </div>
          <div className="edit-container bg-gray-700 w-[50%] flex flex-col gap-3 justify-center items-center">
            <ProfileMainCard />
            <Feed user={user} />
          </div>
          <div className="bg-gray-700 w-[25%] flex flex-col items-center">
            {user.subscriptionPlan !== "GOLD" && (
              <div className="bg-[rgb(83,94,109)] rounded-lg p-6 text-center mt-3 mr-5">
                <h1 className="text-2xl font-bold text-[#a7fbcb] mb-4">
                  Unlock Better Features!
                </h1>

                <p className="text-white mb-6 font-semibold">
                  Upgrade your subscription plan today to access exclusive content, partners, and more!
                </p>
                
                <Link 
                  to="/pricing" 
                  state={{ message1: "You are just one step away...",
                          message2: "Choose the plan that best suits your needs and unlock the features you desire!"
                  }} 
                  className="bg-[#a7fbcb] text-gray-500 font-bold py-2 px-4 rounded-lg hover:bg-[#51bf81] transition duration-200 no-underline"
                >
                  Upgrade Now
                </Link>
              </div>

            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccountPage;