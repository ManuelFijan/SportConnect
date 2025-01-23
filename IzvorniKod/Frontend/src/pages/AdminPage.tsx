import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { RxUpdate } from "react-icons/rx";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Layout/Navbar";
import Feed from "../components/Posts/Feed";
import UserFeed from "../components/UserFeed";
import PostsCard from "../components/Posts/PostsCard";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";


const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]);
  const [noPosts, setNoPosts] = useState(true);
  const [update, setUpdate] = useState("");
  const [rank, setRank] = useState("");
  const [ban, setBan] = useState("");
  const [unban, setUnBan] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if(user?.userType !== "ADMIN")
      navigate("/error")
  }, [token, navigate, user]);

  const openUser = async (email: any) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_API}/posts/user?userEmail=${email}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSelectedUserPosts(data);
        setNoPosts(data.length);
      } else {
        console.error("Failed to fetch user posts");
      }
    } catch (error) {
      console.error("Error fetching user posts", error);
    }
  };

  const updateUser = async (email: any) => {
    setUpdate(email);
  };

  const handleSelected = async (e: any) => {
    setRank(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/update-rank`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: update,
            subscriptionPlan: rank,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
      } else {
        console.error(`Error with updating ${update} rank.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setUpdate("");
  };

  const banUser = (email : string) => {
    setBan(email);
  }

  const handleBan = async (e : any) => {
    e.preventDefault()
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/ban`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: ban,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
      } else {
        console.error(`Error with banning user ${ban}.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setBan("");
  }

  const unbanUser = (email : string) => {
    setUnBan(email);
  }

  const handleUnBan = async (e : any) => {
    e.preventDefault()
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/users/unban`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: unban,
          }),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
      } else {
        console.error(`Error with unbanning user ${unban}.`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setUnBan("");
  }

  return (
    <div className={"admin-page text-white bg-gray-700 min-h-screen min-w-screen "+(user ? "":"flex justify-center items-center")}>
      {user ? (
        <div>
          <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
          <div className="body-admin-page flex flex-col items-center md:flex-row md:items-start overflow-hidden">
            {/* Left Div */}
            <div className="left-div-admin-page mt-[rem] md:mt-1">
              <div className="flex md:flex-col gap-2">
                <button
                  className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white font-bold py-2 px-3 rounded"
                  onClick={() => {
                    setShowUsers(!showUsers);
                    setShowFeed(false);
                    setNoPosts(true);
                    setSelectedUserPosts([]);
                  }}
                >
                  {showUsers ? "Hide Users" : "Show Users"}
                </button>

                <button
                  className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white font-bold py-2 px-3 rounded"
                  onClick={() => {
                    setShowUsers(false);
                    setShowFeed(true);
                    setSelectedUserPosts([]);
                    setNoPosts(true);
                  }}
                >
                  All Posts
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row h-[100%] w-full">
              {/* Middle Div */}
              <div
                className={
                  "middle-div-admin-page scrollbar-none " +
                  (showFeed
                    ? "w-full pl-16 md:pl-0 md:w-[90%] mt-[-8rem] md:mt-0 md:ml-[6rem] lg:ml-[10rem] overflow-y-auto"
                    : "") +
                  (showUsers
                    ? "mt-[-8.7rem] ml-[4rem] md:ml-0 h-[13rem] lg:h-[100%] md:mt-0 overflow-y-auto lg:flex-1"
                    : "") +
                  (!showFeed && !showUsers ? " flex-1" : "")
                }
              >
                {!showFeed && !showUsers && (
                  <p className={"ml-[12rem] md:ml-[5.5rem] pt-[2.5rem]"}>
                    Select an option.
                  </p>
                )}
                {showFeed && <Feed user={user} adminPanel={true} />}
                {showUsers && (
                  <div className="users-list mt-4 w-full ">
                    <UserFeed openUser={openUser} updateUser={updateUser} update={update} ban={ban} unban={unban} banUser={banUser} unbanUser={unbanUser}/>
                  </div>
                )}
              </div>

              {/* Right Div */}
              <div className="right-div-admin-page flex-1 mt-[12px] lg:mt-[0rem] overflow-y-auto scrollbar-none">
                {showUsers && (
                  <div className="w-[97%] pl-[4.5rem] md:pl-[0rem] md:w-full mt-4">
                    {selectedUserPosts.length > 0 ? (
                      selectedUserPosts.map((post: any) => (
                        <PostsCard
                          key={post.postId}
                          postId={post.postId}
                          creator={post.partner}
                          firstname={post.partner.firstName}
                          lastname={post.partner.lastName}
                          profilePic={post.partner.profilePicture}
                          pic={post.imageUrl}
                          message={post.textContent}
                          like={post.likeCount}
                          user={user}
                          delPost={openUser}
                          adminDelUser={true}
                          tier={post.tier}
                        />
                      ))
                    ) : noPosts ? (
                      <p className="text-center flex mt-4">
                        Select a user to view their posts
                      </p>
                    ) : (
                      <p className="text-center flex mt-4">
                        User has no posts yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {update && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="p-5 -pt-1 bg-gray-200 rounded text-gray-600 relative"
              >
                <div className="absolute top-2 right-2">
                  <div className="group">
                    <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
                    <IoCloseCircle
                      onClick={() => setUpdate("")}
                      className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block transition duration-300"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <RxUpdate className="mt-1" />
                  <span className="mb-[0.6rem]">Update <b>{update}</b> rank:</span>
                </div>
                <select
                  className="form-select form-select-sm"
                  aria-label="Small select example"
                  defaultValue="default"
                  onChange={handleSelected}
                >
                  <option value="default">Open this select menu</option>
                  <option value="FREE">FREE</option>
                  <option value="BRONZE">BRONZE</option>
                  <option value="SILVER">SILVER</option>
                  <option value="GOLD">GOLD</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-300 rounded px-2 py-1 border mt-2 w-full font-semibold"
                >
                  Upgrade/Downgrade
                </button>
              </form>
            </div>
          )}
          {ban && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
              <form
                onSubmit={handleBan}
                className="p-5 -pt-1 bg-gray-200 rounded text-gray-600 relative"
              >
                <div className="absolute top-2 right-2">
                  <div className="group">
                    <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
                    <IoCloseCircle
                      onClick={() => setBan("")}
                      className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block transition duration-300"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="mb-[0.6rem]">Are you sure you want to ban this user?</span>
                </div>

                <button
                  type="submit"
                  className="bg-red-600 text-gray-100 hover:bg-red-700 transition duration-300 rounded px-2 py-1 border mt-2 w-full font-semibold"
                >
                  Ban user with email: {ban}
                </button>
              </form>
            </div>
          )}
          {unban && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
              <form
                onSubmit={handleUnBan}
                className="p-5 -pt-1 bg-gray-200 rounded text-gray-600 relative"
              >
                <div className="absolute top-2 right-2">
                  <div className="group">
                    <IoCloseCircleOutline className="cursor-pointer group-hover:hidden h-6 w-6" />
                    <IoCloseCircle
                      onClick={() => setUnBan("")}
                      className="cursor-pointer h-6 w-6 hidden text-red-500 group-hover:block transition duration-300"
                    />
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="mb-[0.6rem]">Are you sure you want to unban this user?</span>
                </div>

                <button
                  type="submit"
                  className="bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-300 rounded px-2 py-1 border mt-2 w-full font-semibold"
                >
                  Unban user with email: {unban}
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default AdminPage;
