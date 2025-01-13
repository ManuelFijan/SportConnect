import Navbar from "../components/Layout/Navbar.tsx";
import { useState, useContext } from "react";
import ProfileMainCard from "../components/Profile/ProfileMainCard.tsx";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AdsList from "../components/AdsList.tsx";
import ProfileFeed from "../components/Profile/ProfileFeed.tsx";

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
      <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen}/>
      {!isMenuOpen && (
        <div className="flex justify-center align-items-top py-2 gap-4">
          <div className="bg-gray-700 hidden md:w-[25%] md:flex flex-col items-center pt-2">
            <div className="mt-2 ml-5">
              <AdsList/>
            </div>
          </div>
          <div className="edit-container bg-gray-700 w-[80%] sm:w-[65%] md:w-[45%] flex flex-col gap-3 justify-start items-center">
            <ProfileMainCard />
            <ProfileFeed user={user} />
          </div>
          <div className="bg-gray-700 hidden md:w-[25%] md:flex flex-col items-center">
            {(user.subscriptionPlan !== "GOLD" && user.userType !== "ADMIN") && (
              <div className="bg-[rgb(83,94,109)] rounded-lg p-6 text-center mt-3 mr-5 hidden md:block">
                <h1 className="text-lg lg:text-2xl font-bold text-[#a7fbcb] mb-4">
                  Unlock Better Features!
                </h1>

                <p className="text-sm lg:text-base text-white mb-6 font-semibold">
                  Upgrade your subscription plan today to access exclusive content, partners, and more!
                </p>
                
                <Link 
                  to="/pricing" 
                  state={{ message1: "You are just one step away...",
                          message2: "Choose the plan that best suits your needs and unlock the features you desire!"
                  }} 
                  className="text-sm lg:text-base bg-[#a7fbcb] text-gray-500 font-bold py-2 px-1 lg:px-4 rounded-lg hover:bg-[#51bf81] transition duration-200 no-underline"
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