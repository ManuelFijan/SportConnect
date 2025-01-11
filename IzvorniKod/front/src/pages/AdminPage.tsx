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
  const { token, user } = useContext(AuthContext); // Access AuthContext
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showFeed, setShowFeed] = useState(true);
  const [selectedUserPosts, setSelectedUserPosts] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Redirect na home ako nije authenticated
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  /*
  const fetchUsers = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
*/

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

  const handleUserPosts = (posts: any[], userId: string) => {
    setSelectedUserPosts(posts);
    setSelectedUserId(userId);
  };

  return (
    <div className="admin-page text-white bg-gray-700 min-h-screen min-w-screen">
      {user ? (
        <div>
          <Navbar isOpen={isMenuOpen} setIsOpen={setMenuOpen} />

          <div className="body-admin-page">
            <div className="left-div-admin-page mt-1">
              <div className="flex flex-col gap-2">
                <button
                  className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setShowUsers(true);
                    setShowFeed(false);
                    //if (!users.length) fetchUsers();
                  }}
                >
                  {showUsers ? "Hide Users" : "Show Users"}
                </button>

                <button
                  className="bg-[#5d49e0] hover:bg-[#503fbe] transition duration-300 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setShowUsers(false);
                    setShowFeed(true);
                  }}
                >
                  All Posts
                </button>
              </div>
            </div>

            <div className="middle-div-admin-page flex flex-col justify-center items-center">
              {showFeed && <Feed user={user} adminPanel={true} />}
              {showUsers && (
                <div className="users-list mt-4 w-full flex flex-col items-center">
                  <UserFeed
                    //onUserPostsUpdate={handleUserPosts}
                    //selectedUserId={selectedUserId}
                    openUser={openUser}
                  />
                </div>
              )}
            </div>

            <div className="right-div-admin-page mt-4">
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
                  />
                ))
              ) : (
                <p className="text-center mt-4">
                  Select a user to view their posts
                </p>
              )}
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
