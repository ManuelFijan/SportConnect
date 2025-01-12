export default function UserCard({
  id,
  email,
  firstName,
  lastName,
  userName,
  userType,
  subscriptionPlan,
  profilePicture,
  openUser,
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
        </div>
      </div>
      <div className="flex flex-row justify-around">
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

        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex flex-row gap-2 text-gray-700">
            <span className="font-medium">Subscription:</span>
            <span className="capitalize truncate">
              {subscriptionPlan.toLowerCase()}
            </span>
          </div>
          <button
            className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white font-bold py-2 px-3 rounded"
            onClick={() => openUser(email)}
          >
            View User's Posts
          </button>
        </div>
      </div>
    </div>
  );
}
