export default function UserCard({
    id,
    email,
    firstName,
    lastName,
    userName,
    userType,
    subscriptionPlan,
    profilePicture,
    setFilterUserEmail
  }: any) {
    return (
      <div className="h-auto w-[96%] bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg">
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
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row flex-wrap gap-4 text-gray-700 text-sm items-center">
            <div className="flex flex-row gap-2 whitespace-nowrap">
              <span className="font-medium">Username:</span>
              <span className="truncate">{userName}</span>
            </div>
            <div className="flex flex-row gap-2 whitespace-nowrap">
              <span className="font-medium">Email:</span>
              <span className="truncate">{email}</span>
            </div>
            <div className="flex flex-row gap-2 whitespace-nowrap">
              <span className="font-medium">User Type:</span>
              <span className="capitalize truncate">{userType.toLowerCase()}</span>
            </div>
            <div className="flex flex-row gap-2 whitespace-nowrap">
              <span className="font-medium">Subscription:</span>
              <span className="capitalize truncate">{subscriptionPlan.toLowerCase()}</span>
            </div>
          </div>
  
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
            onClick={() => setFilterUserEmail(email)}
          >
            View User's Posts
          </button>
        </div>
      </div>
    );
  }
  