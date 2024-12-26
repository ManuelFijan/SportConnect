import Navbar from "../components/Navbar.tsx";
import { useState, useEffect } from "react";
import ProfileMainCard from "../components/ProfileMainCard.tsx";
import { useLocation } from 'react-router-dom';


const api = "http://localhost:8080";  // base api-ja na backendu

function MyAccountPage() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = location.state || {};
  const [updatedUser, setUpdatedUser] = useState(user);

  useEffect(() => {
    fetch(`${api}/users/get-information/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatedUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="bg-gray-700 min-w-screen min-h-screen">
      <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} userPic={updatedUser} />
      {!isMenuOpen && (
        <div className="flex h-[calc(100vh-5rem)] align-items-top">
          <div className="bg-gray-700 w-1/4 p-4">
            <h3>Left Section</h3>
            <p>Content for the left section.</p>
          </div>
          <div className="edit-container bg-gray-700 w-1/2 p-4 flex justify-center items-start">
            <ProfileMainCard />
          </div>
          <div className="bg-gray-700 w-1/4 p-4">
            <h3>Right Section</h3>
            <p>Content for the right section.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccountPage;
