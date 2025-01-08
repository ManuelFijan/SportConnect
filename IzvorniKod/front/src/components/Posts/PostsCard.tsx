import { useEffect, useState } from "react";
import Comments from "./Comments";
import ReadMore from "../ReadMore";
import { FaRegSave, FaSave } from "react-icons/fa";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoIosMore, IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

export default function PostsCard({
  postId,
  firstname,
  lastname,
  profilePic,
  pic,
  message,
  like,
  isLiked,
  isSaved,
  com,
  user,
}: any) {
  const [likes, setLikes] = useState(isLiked);
  const [comm, setComm] = useState(isSaved);
  const [saves, setSaves] = useState(false);
  const [likeNum, setLikeNum] = useState(like);
  const [commNum, setCommNum] = useState(com);

  useEffect(() => {
    setLikes(isLiked);
  }, [isLiked]);

  useEffect(() => {
    setSaves(isSaved);
  }, [isSaved]);

  const handleLike = async () => {
    try {
      const userEmail = user.email;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/${postId}/like?userEmail=${userEmail}`,
        { method: "POST" }
      );
      const data = await response.json();

      if (response.ok) {
        setLikeNum(data.likeCount);
        setLikes(!likes);
      } else {
        console.error("Error liking/unliking the post.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSave = async () => {
    try {
      const userEmail = user.email;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/${postId}/save?userEmail=${userEmail}`,
        { method: "POST" }
      );
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setSaves(!saves);
      } else {
        console.error("Error saving/un-saving the post.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleComments = () => {
    setCommNum((prev: any) => prev + 1);
  };

  const handleDelete = () => {
    // Handle comment deletion
    console.log("Delete comment functionality here.");
  };

  return (
    <div className="h-auto w-[93%] bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg">
      {/* USER */}
      <div className="flex flex-row justify-between text-gray-700">
        <div className="flex flex-row gap-2">
          <img
            src={profilePic || "./user.png"}
            alt="user_picture"
            height={24}
            width={24}
            className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
          />
          <span className="text-gray-700 mt-2">
            {firstname} {lastname}
          </span>
        </div>
        {user.userType === "PARTNER" && (
          <div className="dropdown">
            <IoIosMore
              data-bs-toggle="dropdown"
              height={16}
              width={16}
              className="dropdown-toggle h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
            />
            <ul className="dropdown-menu">
              <li
                onClick={handleDelete}
                className="dropdown-item cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 text-gray-700">
        <ReadMore message={message} />
        {pic && (
          <img src={pic} alt="post_image" className="w-full h-[320px] rounded-md object-cover" />
        )}
      </div>

      {/* INTERACTION */}
      <div className="flex flex-row justify-between text-xs">
        {/* Likes */}
        <div
          className={`flex flex-row bg-white rounded-full p-1 transition duration-300 ${
            likes ? "text-purple-600 font-semibold" : " text-gray-700"
          }`}
        >
          {likes ? (
            <IoMdHeart
              className="cursor-pointer text-purple-600 mt-[0.1rem] ml-1"
              size={17}
              onClick={handleLike}
            />
          ) : (
            <IoIosHeartEmpty
              className="cursor-pointer text-purple-600 mt-[0.1rem] ml-1"
              size={17}
              onClick={handleLike}
            />
          )}
          <span className="pr-2 mt-[0.1rem] ml-1 cursor-pointer" onClick={handleLike}>
            {likeNum}
          </span>
          <span className="mr-1 ml-1 cursor-pointer mt-[0.1rem] hidden md:block" onClick={handleLike}>
            Useful
          </span>
        </div>

        {/* Comments */}
        <div className="text-gray-700 flex flex-row bg-white rounded-full p-1">
          <VscCommentDiscussion
            onClick={() => setComm(!comm)}
            className="cursor-pointer text-purple-600 h-5 w-5 mr-1 mt-[0rem] pl-1 ml-1"
          />
          <span className="pr-2 md:pr-1 ml-1 cursor-pointer">{commNum}</span>
          <span className="mr-1 cursor-pointer hidden md:block">Comments</span>
        </div>

        {/* Save */}
        <div
          className={`text-gray-700 flex flex-row rounded-full p-1 transition duration-300 ${
            saves ? "bg-purple-600 text-white" : "bg-white"
          }`}
        >
          {saves ? (
            <FaSave
              onClick={handleSave}
              className="cursor-pointer h-4 w-5 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          ) : (
            <FaRegSave
              onClick={handleSave}
              className="cursor-pointer text-purple-600 h-4 w-5 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          )}
          <span className="pr-2 pl-1 cursor-pointer hidden lg:block" onClick={handleSave}>Save</span>
        </div>
      </div>

      {/* COMMENTS */}
      <Comments bool={comm} addComm={handleComments} user={user} />
    </div>
  );
}
