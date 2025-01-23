import Navbar from "../components/Layout/Navbar.tsx";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import AdsList from "../components/AdsList.tsx";
import ProfileUserCard from "../components/Profile/ProfileUserCard.tsx";
import ProfileUserFeed from "../components/Profile/ProfileUserFeed.tsx";

function ViewUserProfile() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(AuthContext); //Pristupanje user-u iz AuthContext

  const location = useLocation();
  const data = location.state || null;
  const navigate = useNavigate()

  useEffect(() => {
    if(user?.banned)
      navigate("/banned-page")
  }, [user])

  //Ako se jos load-a user samo neki loading screen
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <p className="text-white text-xl">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 min-w-screen min-h-screen">
      <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
      {!isMenuOpen && (
        <div className="flex justify-center align-items-top py-2 gap-4">
          <div className="bg-gray-700 hidden md:w-[25%] md:flex flex-col items-center pt-2">
            <div className="mt-2 ml-5">
              <AdsList />
            </div>
          </div>
          <div className="edit-container bg-gray-700 w-[80%] sm:w-[65%] md:w-[45%] flex flex-col gap-3 justify-start items-center">
            <ProfileUserCard user={data} />
            <ProfileUserFeed user={data} user_watching={user} />
          </div>
          <div className="bg-gray-700 hidden md:w-[25%] md:flex flex-col items-center"></div>
        </div>
      )}
    </div>
  );
}

export default ViewUserProfile;
