import "../../styles/ProfileMainCard.css";
import defaultProfilePicture from "/user.png";
import { FaMedal } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

function ProfileUserCard({ user } : any) {
  return (
    <div className={"profile-container-main"}>
      <div className="relative w-full">
        <img
          src="./profile-background.jpg"
          alt="background"
          className="img1-main w-full rounded-lg"
        />

        <div
          className="absolute left-1/2 bottom-[-3%] transform -translate-x-1/2 translate-y-1/2 w-[15vw] h-[15vw] rounded-full overflow-hidden flex items-center justify-center"
        >
          {user.data.userType === "ADMIN" ? (
            <RiAdminLine className="rounded-full text-gray-700 p-3 h-full w-full bg-white" />
          ) : (
            <img
              src={user.data.profilePicture || defaultProfilePicture}
              alt={`${user.data.userName}'s profile`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 h-20 mt-[calc(7vw+0.7rem)]">
        <span className="text-lg md:text-2xl lg:text-3xl text-white font-bold mb-2">
          {user.data.firstName} {user.data.userType !== "ADMIN" && user.data.lastName}
        </span>

        {/*ovisno koji je plan takve je boje medalja*/}
        {user.data.subscriptionPlan === "GOLD" && (
          <>
            <div className="text-[#f0bf0d] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#f0bf0d] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.data.subscriptionPlan === "SILVER" && (
          <>
            <div className="text-[#cecdcd] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#cecdcd] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.data.subscriptionPlan === "BRONZE" && (
          <>
            <div className="text-[#b3652c] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#b3652c] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

        {user.data.subscriptionPlan === "FREE" && (
          <>
            <div className="text-[#279536] hidden lg:block">
              <FaMedal size={40} />
            </div>

            <div className="text-[#279536] block lg:hidden">
              <FaMedal size={30} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ProfileUserCard;
