import "../styles/ProfileCard.css";
import { Link } from "react-router-dom";
import defaultProfilePicture from "/user.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiAdminLine } from "react-icons/ri";

function ProfileCard() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="profile-container sticky top-[6.7rem]">
      <img src="./profile-background.jpg" alt="background" className="img1" />
      {user.userType === "ADMIN" ? (
        <RiAdminLine className="img2 rounded-full text-gray-700 p-1 md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] bg-white" />
      ) : (
        <img
          src={user.profilePicture || defaultProfilePicture}
          alt={`${user.userName}'s profile`}
          className="img2 md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem]"
        />
      )}
      <p className="mt-[-1.6rem]">
        {user.firstName} {user.userType !== "ADMIN" && user.lastName}
      </p>
      <Link to="/my-account" state={{ user }}>
        <button className="button">My profile</button>
      </Link>
    </div>
  );
}

export default ProfileCard;
