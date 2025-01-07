import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import { useEffect, useState, useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import Feed from "../components/Posts/Feed";
import AddPost from "../components/Posts/AddPost";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min";

function MainPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext); // Access AuthContext
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Redirect na home ako nije authenticated
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="main-page text-white bg-gray-700 min-h-screen min-w-screen">
      {user ? (
        <div>
          <Navbar
            isOpen={isMenuOpen}
            setIsOpen={setMenuOpen}
            userPic={user.profilePicture || "/user.png"}
          />

          <div className="body-main-page">
            <div className="left-div-main-page">
              <ProfileCard />
            </div>

            <div className="middle-div-main-page flex flex-col justify-center items-center">
              {user.userType === "PARTNER" && <AddPost />}
              <Feed user={user} />
            </div>

            <div className="right-div-main-page">
              <p className="mt-9 sticky top-[8.7rem]">RIGHT DIV</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default MainPage;
