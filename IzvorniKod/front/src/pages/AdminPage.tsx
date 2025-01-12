import "../styles/AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "../components/Layout/Navbar";
import Feed from "../components/Posts/Feed";
import UserFeed from "../components/UserFeed";
import PostsCard from "../components/Posts/PostsCard";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const openUser = async (email: any) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_API}/posts/user?userEmail=${email}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSelectedUserPosts(data);
      } else {
        console.error("Failed to fetch user posts");
      }
    } catch (error) {
      console.error("Error fetching user posts", error);
    }
  };

  return (
    <div className="admin-page text-white bg-gray-700 min-h-screen min-w-screen">
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
                    <UserFeed openUser={openUser} />
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
                        />
                      ))
                    ) : (
                      <p className="text-center flex mt-4">
                        Select a user to view their posts
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default AdminPage;
