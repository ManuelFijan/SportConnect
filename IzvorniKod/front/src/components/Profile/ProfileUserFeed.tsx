import { useEffect, useState } from "react";
import PostsCard from "../Posts/PostsCard";

export default function ProfileFeed({ user, user_watching }: any) {
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const check = ["FREE", "BRONZE", "SILVER", "GOLD"];

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/user?userEmail=${user.data.email}`
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

  function findUserL(post: any) {
    let likedby = post.likedBy;
    for (let j = 0; j < likedby.length; j++) {
      if (likedby[j].userId === user_watching.userId) return true;
    }
    return false;
  }

  function findUserS(post: any) {
    let savedby = post.savedBy;
    for (let j = 0; j < savedby.length; j++) {
      if (savedby[j].userId === user_watching.userId) return true;
    }
    return false;
  }

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  return (
    <div
      className={
        "w-full h-auto bg-[#535e6d] rounded-lg flex flex-col justify-center items-center pt-[2.3rem]"
      }
    >
      {userPosts.map(
        (post: any) =>
          check.indexOf(post.tier) <=
            check.indexOf(user_watching.subscriptionPlan) && (
            <PostsCard
              key={post.postId}
              postId={post.postId}
              creator={post.partner}
              pic={post.imageUrl}
              message={post.textContent}
              like={post.likeCount}
              isLiked={findUserL(post)}
              isSaved={findUserS(post)}
              user={user_watching}
              tier={post.tier}
            />
          )
      )}

      {userPosts.length === 0 && (
        <p className="text-white py-10">No posts created yet</p>
      )}
    </div>
  );
}
