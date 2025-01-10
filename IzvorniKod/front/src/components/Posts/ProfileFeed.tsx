import { useEffect, useState } from "react";
import PostsCard from "./PostsCard";

export default function Feed({ user, update }: any) {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [savedPosts, setSavedPosts] = useState<any[]>([]);
  const [viewSaved, setViewSaved] = useState(false);
  const [del, setDel] = useState(false);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/user?userEmail=${user.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserPosts(data); // Set posts data to state
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
    fetchUserPosts();
  }, [del, update]);

  useEffect(() => {
    fetchSavedPosts();
  }, [user.email, del, update]);

  const delPost = () => {
    setDel(!del); // triger za rerender obnovljenih objava bez onih koje su obrisane
  };

  const newSaved = () => {
    fetchSavedPosts();
    fetchUserPosts();
  };

  return (
    <div
      className={
        "w-full h-auto bg-[#535e6d] rounded-lg flex flex-col justify-center items-center pt-3" +
        (user.userType === "PARTNER" ? "" : " mt-3")
      }
    >
      {/* Toggle buttons for sorting */}
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-[#5643CC] hover:bg-[#40319e] transition duration-300 text-white rounded-lg"
          onClick={() => setViewSaved(!viewSaved)}
        >
          {viewSaved ? "View My Posts" : "View Saved"}
        </button>
      </div>
      {/* Render posts based on viewSaved state */}
      {viewSaved
        ? savedPosts.map((post: any) => (
            <PostsCard
              key={post.postId}
              postId={post.postId}
              creator={post.partner}
              pic={post.imageUrl}
              message={post.textContent}
              like={post.likeCount}
              isLiked={findUserL(post)}
              isSaved={findUserS(post)}
              user={user}
              delPost={delPost}
              newSaved={newSaved}
            />
          ))
        : userPosts.map((post: any) => (
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

      {userPosts.length === 0 && !viewSaved ? (
        <p className="text-white py-10">No posts created yet</p>
      ) : null}

      {savedPosts.length === 0 && viewSaved ? (
        <p className="text-white py-10">No posts saved yet</p>
      ) : null}
    </div>
  );
}
