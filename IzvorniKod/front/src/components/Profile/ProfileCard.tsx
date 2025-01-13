import "../../styles/ProfileCard.css";
import { Link } from "react-router-dom";
import defaultProfilePicture from "/user.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RiAdminLine } from "react-icons/ri";
import { FaMedal } from "react-icons/fa";

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
      <div className="flex justify-center items-center gap-2 -mt-8">
        <p className="mt-2">
          {user.firstName} {user.userType !== "ADMIN" && user.lastName}
        </p>
        {user.subscriptionPlan === "GOLD" && (
          <FaMedal className="w-[14px] h-[14px] text-[#f0bf0d]" />
        )}

        {user.subscriptionPlan === "SILVER" && (
          <FaMedal className="w-[14px] h-[14px] text-[#cecdcd]" />
        )}

        {user.subscriptionPlan === "BRONZE" && (
          <FaMedal className="w-[14px] h-[14px] text-[#b3652c]" />
        )}

        {user.subscriptionPlan === "FREE" && (
          <FaMedal className="w-[14px] h-[14px] text-[#279536]" />
        )}
      </div>
      <Link to="/my-account" state={{ user }}>
        <button className="button">My profile</button>
      </Link>
    </div>
  );
}

export default ProfileCard;
