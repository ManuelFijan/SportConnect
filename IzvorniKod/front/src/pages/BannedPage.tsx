import "../styles/MainPage.css";
import Navbar from "../components/Layout/Navbar";
import ProfileCard from "../components/Profile/ProfileCard";
import Feed from "../components/Posts/Feed";
import AddPost from "../components/Posts/AddPost";
import AdsList from "../components/AdsList.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BannedPage() {
  const { token, user, logout } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user?.banned) {
      // Onemogućavanje scrollanja
      document.body.style.overflow = "hidden";
    } else {
      // Omogućavanje scrollanja
      document.body.style.overflow = "auto";
    }

    // Čišćenje efekta pri unmountu
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user]);

  const handleSubmit = () => {
    logout(); // Brise token i user data iz AuthContext
    navigate("/"); // vraca na pocetak
  }

  return (
    <div className={"main-page text-white bg-gray-700 min-h-screen min-w-screen "+(user ? "":"flex justify-center items-center")}>
      {user ? (
        <div>
          <Navbar />

          <div className="body-main-page flex gap-5">
            <div className="left-div-main-page hidden md:block">
              <ProfileCard />
            </div>

            <div className="w-[100%] md:w-[50%] flex justify-center items-start">
              <div className="middle-div-main-page flex flex-col justify-center items-center w-[93%] xs:w-[80%] md:w-full">
                <AddPost />
                <Feed user={user} />
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
      {user?.banned && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
          <form className="p-5 -pt-1 bg-gray-200 rounded text-gray-600 relative" onSubmit={handleSubmit}>
            <div>
              <span className="font-bold">
                {user.firstName} {user.lastName}
              </span>{" "}
              your User Account has been suspended by administrator.
            </div>
            <button type="submit" className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 mt-2 text-gray-100 px-[10px] py-[6px] rounded">
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BannedPage;
