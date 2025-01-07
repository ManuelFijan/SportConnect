import { useEffect, useState } from "react";
import PostsCard from "./PostsCard";

export default function Feed({ user }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [viewSaved, setViewSaved] = useState(false);
  const [sortBy, setSortBy] = useState<string>("newest");

  const fetchPosts = async (sortBy: string | null = null) => {
    try {
      const url = sortBy
          ? `${import.meta.env.VITE_BACKEND_API}/posts?sortBy=${sortBy}`
          : `${import.meta.env.VITE_BACKEND_API}/posts`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // Set posts data to state
      } else {
        console.error("Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchSavedPosts = async () => {
    try {
      const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/posts/saved?userEmail=${user.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setSavedPosts(data);
      } else {
        console.error("Failed to fetch saved posts.");
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(sortBy);
    fetchSavedPosts();
  }, [user.email, sortBy]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy); // Update sorting parameter
  };

  return (
      <div className="w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] h-auto bg-white rounded-lg flex flex-col justify-center items-center pt-3">
        {/* Toggle buttons for sorting */}
        <div className="flex gap-4 mb-4">
          <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setViewSaved(!viewSaved)}
          >
            {viewSaved ? "View All Posts" : "View Saved"}
          </button>

          <button
              className={`px-4 py-2 ${
                  sortBy === "newest" ? "bg-green-500" : "bg-gray-500"
              } text-white rounded-lg`}
              onClick={() => handleSortChange("newest")}
          >
            Newest
          </button>

          <button
              className={`px-4 py-2 ${
                  sortBy === "mostLikes" ? "bg-green-500" : "bg-gray-500"
              } text-white rounded-lg`}
              onClick={() => handleSortChange("mostLikes")}
          >
            Most Likes
          </button>

          <button
              className={`px-4 py-2 ${
                  sortBy === "mostSaves" ? "bg-green-500" : "bg-gray-500"
              } text-white rounded-lg`}
              onClick={() => handleSortChange("mostSaves")}
          >
            Most Saves
          </button>
        </div>

        {/* Render posts based on viewSaved state */}
        {viewSaved
            ? savedPosts.map((post: any) => (
                <PostsCard
                    key={post.postId}
                    postId={post.postId}
                    pic={post.imageUrl}
                    message={post.textContent}
                    like={post.likeCount}
                    com={post.comments.length}
                    user={user}
                />
            ))
            : posts.map((post: any) => (
                <PostsCard
                    key={post.postId}
                    postId={post.postId}
                    pic={post.imageUrl}
                    message={post.textContent}
                    like={post.likeCount}
                    com={post.comments.length}
                    user={user}
                />
            ))}
      </div>
  );
}