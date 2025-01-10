import { useEffect, useState } from "react";
import PostsCard from "./PostsCard";

export default function Feed({ user, update }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [del, setDel] = useState(false);

  const fetchPosts = async (sortBy: string | null = null) => {
    try {
      const url = sortBy
        ? `${import.meta.env.VITE_BACKEND_API}/posts?sortBy=${sortBy}`
        : `${import.meta.env.VITE_BACKEND_API}/posts`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Set posts data to state
        console.log(data);

      } else {
        console.error("Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  function findUserL(post: any) {
    let likedby = post.likedBy;
    for (let j = 0; j < likedby.length; j++) {
      if (likedby[j].userId === user.userId) return true;
    }
    return false;
  }

  function findUserS(post: any) {
    let savedby = post.savedBy;
    for (let j = 0; j < savedby.length; j++) {
      if (savedby[j].userId === user.userId) return true;
    }
    return false;
  }

  useEffect(() => {
    fetchPosts(sortBy);
    
  }, [sortBy, del, update]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy); // Update sorting parameter
  };

  const delPost = () => {
    setDel(!del); // triger za rerender obnovljenih objava bez onih koje su obrisane
  };

  const newSaved = () => {
    fetchPosts();
  };

  return (
    <div
      className={
        "w-full h-auto bg-[#535e6d] rounded-lg flex flex-col justify-center items-center pt-3" +
        (user.userType === "PARTNER" ? "" : " mt-3")
      }
    >
      {/* Toggle buttons for sorting */}
      <div className="flex gap-4 mb-3">
        <button
          className={`px-4 py-2 ${
            sortBy === "newest"
              ? "bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-400 "
              : "bg-gray-200 hover:bg-gray-300 transition duration-400"
          } text-gray-700 rounded-lg`}
          onClick={() => handleSortChange("newest")}
        >
          Newest
        </button>

        <button
          className={`px-4 py-2 ${
            sortBy === "mostLikes"
              ? "bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-400 "
              : "bg-gray-200 hover:bg-gray-300 transition duration-400"
          } text-gray-700 rounded-lg`}
          onClick={() => handleSortChange("mostLikes")}
        >
          Most Likes
        </button>

        <button
          className={`px-4 py-2 ${
            sortBy === "mostSaves"
              ? "bg-[#a7fbcb] hover:bg-[#51bf81] transition duration-400 "
              : "bg-gray-200 hover:bg-gray-300 transition duration-400"
          } text-gray-700 rounded-lg`}
          onClick={() => handleSortChange("mostSaves")}
        >
          Most Saves
        </button>
      </div>
      {/* Render posts based on viewSaved state */}
      {posts.map((post: any) => (
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
          isLiked={findUserL(post)}
          isSaved={findUserS(post)}
          user={user}
          delPost={delPost}
          newSaved={newSaved}
        />
      ))}
    </div>
  );
}
