import "../styles/MainPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import { useEffect, useState, useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import Feed from "../components/Posts/Feed";
import AddPost from "../components/Posts/AddPost";
import { AuthContext } from "../context/AuthContext";
import AdsList from "../components/AdsList.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";

function MainPage() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext); // Access AuthContext
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  // Redirect na home ako nije authenticated
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  return (
    <div className="main-page text-white bg-gray-700 min-h-screen min-w-screen">
      {user ? (
        <div>
          <Navbar
            isOpen={isMenuOpen}
            setIsOpen={setMenuOpen}
            userPic={user.profilePicture || "/user.png"}
          />

          <div className="body-main-page flex gap-5">
            <div className="left-div-main-page hidden md:block">
              <ProfileCard />
            </div>

            <div className="w-[100%] md:w-[50%] flex justify-center items-center">
              <div className="middle-div-main-page flex flex-col justify-center items-center w-[80%] md:w-full">
                {user.userType === "PARTNER" && (
                  <AddPost handleUpdate={handleUpdate} />
                )}
                <Feed user={user} update={update} />
              </div>
            </div>

            <div className="right-div-main-page hidden md:block">
              <div className="mr-3 mt-3">
                <AdsList />
              </div>
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
