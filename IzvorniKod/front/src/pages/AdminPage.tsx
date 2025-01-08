import '../styles/AdminPage.css';

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

  const handleUserPosts = (posts: any[], userId: string) => {
    setSelectedUserPosts(posts);
    setSelectedUserId(userId);
  };

    return (
        <div className="admin-page text-white bg-gray-700 min-h-screen min-w-screen">
           {user ? (

            <div>
                
                <Navbar
                isOpen={isMenuOpen}
                setIsOpen={setMenuOpen}
                userPic={user.profilePicture || "/user.png"}
                />

                <div className="body-admin-page">
                    <div className="left-div-admin-page">
                        <div className="flex flex-col gap-2">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setShowUsers(!showUsers);
                                    setShowFeed(false);
                                    //if (!users.length) fetchUsers();
                                }}
                            >
                                {showUsers ? 'Hide Users' : 'Show Users'}
                            </button>

                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                        {showFeed && <Feed user={user} />}
                        {showUsers && (
                            <div className="users-list mt-4 w-full flex flex-col items-center">
                                <UserFeed 
                                    //onUserPostsUpdate={handleUserPosts} 
                                    //selectedUserId={selectedUserId}
                                />
                            </div>
                        )}
                    </div>

                    <div className="right-div-admin-page">
                        {selectedUserPosts.length > 0 ? (
                            selectedUserPosts.map((post: any) => (
                                <PostsCard
                                    key={post.postId}
                                    postId={post.postId}
                                    firstname={post.partner.firstName}
                                    lastname={post.partner.lastName}
                                    profilePic={post.partner.profilePicture}
                                    pic={post.imageUrl}
                                    message={post.textContent}
                                    like={post.likeCount}
                                    com={post.comments.length}
                                    user={user}
                                />
                            ))
                        ) : (
                            <p className="text-center mt-4">Select a user to view their posts</p>
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