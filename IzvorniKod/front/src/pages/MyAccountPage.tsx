import Navbar from "../components/Navbar.tsx";
import { useState, useContext } from "react";
import ProfileMainCard from "../components/ProfileMainCard.tsx";
import { AuthContext } from "../context/AuthContext";
import Feed from "../components/Feed.tsx";

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
          <div className="bg-gray-700 w-[25%] flex flex-col items-center pt-2">
            <h3>Right Section</h3>
            <p>Content for the right section.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccountPage;