import { FaBan, FaCheckDouble } from "react-icons/fa";

export default function UserCard({
  email,
  firstName,
  lastName,
  userName,
  userType,
  subscriptionPlan,
  profilePicture,
  openUser,
  updateUser,
  banUser,
  unbanUser,
  isBanned,
}: any) {
  return (
    <div className="h-auto w-[96%] bg-gray-100 flex flex-col gap-3 mb-2 p-2 rounded-lg mr-2 md:mr-0 md:mt-2">
      <div className="flex flex-row justify-between text-gray-700">
        <div className="flex flex-row gap-2">
          <img
            src={profilePicture || "./user.png"}
            alt="user_picture"
            height={24}
            width={24}
            className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
          />
          <span className="text-gray-700 mt-2">
            {firstName} {lastName}
          </span>
          {isBanned && (
            <div className="text-red-600 flex gap-1 mt-2 items-center justify-center rounded-full border-1 border-red-600 px-[10px] opacity-60 h-7">
              <span className="text-sm">Banned</span>
            </div>
          )}
        </div>
        {isBanned ? (
          <div className="cursor-pointer mt-2 hover:text-green-500 transition duration-300">
            <FaCheckDouble onClick={() => unbanUser(email)} />
          </div>
        ) : (
          <div className="cursor-pointer mt-2 hover:text-red-600 transition duration-300">
            <FaBan onClick={() => banUser(email)} />
          </div>
        )}
      </div>
      <div className="flex flex-row justify-around">
        {/* lijevi div kartice */}
        <div className="flex flex-col gap-3 text-gray-700 text-sm items-start justify-start w-1/2">
          <div className="flex flex-row gap-2 break-all">
            <span className="">
              <span className="font-medium">Username:</span> {userName}
            </span>
          </div>
          <div className="flex flex-row gap-2 break-all">
            <span className="">
              <span className="font-medium">Email:</span> {email}
            </span>
          </div>
          <div className="flex flex-row gap-2 whitespace-nowrap">
            <span className="font-medium">User Type:</span>
            <span className="capitalize truncate">
              {userType.toLowerCase()}
            </span>
          </div>
        </div>

        {/* desni div kartice */}
        <div className="flex flex-col gap-1 w-1/2">
          <div className="flex flex-row gap-2 text-gray-700">
            <span className="font-medium">Subscription:</span>
            <span className="capitalize truncate">
              {subscriptionPlan.toLowerCase()}
            </span>
          </div>
          <button
            className="bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-300 text-gray-400 hover:text-gray-100 text-sm font-semibold py-2 px-2 rounded"
            onClick={() => updateUser(email)}
          >
            Update User's rank
          </button>
          <button
            className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white text-sm font-semibold py-2 px-2 rounded"
            onClick={() => openUser(email)}
          >
            View User's Posts
          </button>
        </div>
      </div>
    </div>
  );
}
