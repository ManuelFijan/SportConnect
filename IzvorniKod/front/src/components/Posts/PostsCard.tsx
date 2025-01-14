import { useEffect, useState } from "react";
import Comments from "./Comments";
import ReadMore from "../ReadMore";
import { FaRegSave, FaSave } from "react-icons/fa";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoIosMore, IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaMedal } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function PostsCard({
  postId,
  creator,
  pic,
  message,
  like,
  isLiked,
  isSaved,
  user,
  delPost,
  newSaved,
  adminDelUser,
  tier,
}: any) {
  const [likes, setLikes] = useState(isLiked);
  const [comm, setComm] = useState(false);
  const [saves, setSaves] = useState(isSaved);
  const [likeNum, setLikeNum] = useState(like);
  const [newCom, setNewCom] = useState(false);
  const [comments, setComments] = useState([]);

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
        setSaves(!isSaved);
        newSaved();
      } else {
        console.error("Error saving/un-saving the post.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [newCom]);

  const getComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/${postId}/comments`
      );
      if (response.ok) {
        const data = await response.json();

        setComments(data);
      } else {
        console.error("Failed to fetch posts comments.");
      }
    } catch (error) {
      console.error("Error fetching posts comments:", error);
    }
  };

  const addCom = async (message: string) => {
    if (message) {
      try {
        const userEmail = user.email;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/posts/${postId}/comment?userEmail=${userEmail}&commentText=${message}`,
          { method: "POST" }
        );
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setNewCom(!newCom);
        } else {
          console.error(
            "Error with adding new comment at post(post id: " +
              { postId } +
              ")."
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      setNewCom(!newCom); // samo triger da se useEffect napravi i povuku obnovljeni komentari nakon brisanja
    }
  };

  const handleDelete = async () => {
    try {
      const userEmail = user.email;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/${postId}?userEmail=${userEmail}`,
        { method: "DELETE" }
      );
      const data = await response.text();
      console.log(data);

      if (response.ok) {
        if (adminDelUser) delPost(creator.email);
        else delPost();
      } else {
        console.error("Error deleting comment.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      className={
        "h-auto bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg " +
        (adminDelUser ? "w-[95%]" : "w-[87%]")
      }
    >
      {/* USER */}
      <div className="flex flex-row justify-between text-gray-700">
        <div className="flex flex-row gap-2">
          {creator.userType === "ADMIN" ? (
            <RiAdminLine className="rounded-full border-1 border-gray-700 p-1 flex-1 w-[1.7rem] h-[1.7rem] mt-2 text-gray-700" />
          ) : (
            <img
              src={creator?.profilePicture || "./user.png"}
              alt="user_picture"
              height={24}
              width={24}
              className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
            />
          )}
          <span className="text-gray-700 mt-2">
            {creator.firstName}{" "}
            {creator.userType !== "ADMIN" && creator.lastName}
          </span>
        </div>
        <div className="flex gap-2 mt-2">
          {/*ovisno koji je plan takve je boje medalja*/}
          {tier === "GOLD" && (
            <>
              <div className="text-[#f0bf0d] flex gap-1 items-center justify-center rounded-full border-1 border-[#f0bf0d] px-2 opacity-60 h-7">
                <FaMedal className="w-[14px] h-[14px]" />
                <span className="text-sm">GOLD</span>
              </div>
            </>
          )}

          {tier === "SILVER" && (
            <>
              <div className="text-[#cecdcd] flex gap-1 items-center justify-center rounded-full border-1 border-[#cecdcd] px-2 opacity-60 h-7">
                <FaMedal className="w-[14px] h-[14px]" />
                <span className="text-sm">SILVER</span>
              </div>
            </>
          )}

          {tier === "BRONZE" && (
            <>
              <div className="text-[#b3652c] flex gap-1 items-center justify-center rounded-full border-1 border-[#b3652c] px-2 opacity-60 h-7">
                <FaMedal className="w-[14px] h-[14px]" />
                <span className="text-sm">BRONZE</span>
              </div>
            </>
          )}

          {tier === "FREE" && (
            <>
              <div className="text-[#279536] flex gap-1 items-center justify-center rounded-full border-1 border-[#279536] px-[10px] opacity-60 h-7">
                <FaMedal className="w-[14px] h-[14px]" />
                <span className="text-sm">FREE</span>
              </div>
            </>
          )}
          {/* odreduje moze li  user birsati objavu (...) */}
          {user.userType !== "CLIENT" ? (
            creator.userId === user.userId || user.userType === "ADMIN" ? (
              <div className="dropdown mr-1">
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
                    <p className="text-gray-100 mt-1">Delete</p>
                  </li>
                  <li className="dropdown-item cursor-pointer">
                    <Link
                      to={"/view-profile"}
                      className="no-underline text-gray-100"
                      state={{ data: creator }}
                    >
                      View Profile
                    </Link>
                  </li>
                </ul>
              </div>
            ) : creator.userType !== "ADMIN" ? (
              <div className="dropdown mr-1">
                <IoIosMore
                  data-bs-toggle="dropdown"
                  height={16}
                  width={16}
                  className="dropdown-toggle h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
                />
                <ul className="dropdown-menu">
                  <li className="dropdown-item cursor-pointer">
                    <Link
                      to={"/view-profile"}
                      className="no-underline text-gray-100"
                      state={{ data: creator }}
                    >
                      View Profile
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <IoIosMore
                data-bs-toggle="dropdown"
                height={16}
                width={16}
                className="dropdown-toggle h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
              />
            )
          ) : creator.userType !== "ADMIN" ? (
            <div className="dropdown mr-1">
              <IoIosMore
                data-bs-toggle="dropdown"
                height={16}
                width={16}
                className="dropdown-toggle h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
              />
              <ul className="dropdown-menu">
                <li className="dropdown-item cursor-pointer">
                  <Link
                    to={"/view-profile"}
                    className="no-underline text-gray-100"
                    state={{ data: creator }}
                  >
                    View Profile
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <IoIosMore
              height={16}
              width={16}
              className="h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
            />
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 text-gray-700">
        <ReadMore message={message} post={true} />
        {pic && (
          <img
            src={pic}
            alt="post_image"
            className="w-full h-[320px] rounded-md object-cover"
          />
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
          <span
            className="pr-1 mt-[0.1rem] ml-1 cursor-pointer"
            onClick={handleLike}
          >
            {likeNum}
          </span>
          <span
            className="mr-1 cursor-pointer mt-[0.1rem] hidden md:block"
            onClick={handleLike}
          >
            Useful
          </span>
        </div>

        {/* Comments */}
        <div
          className="text-gray-700 flex flex-row bg-white rounded-full p-1"
          onClick={() => setComm(!comm)}
        >
          <VscCommentDiscussion className="cursor-pointer text-purple-600 h-5 w-5 mr-1 mt-[0rem] pl-1 ml-1" />
          <span className="pr-2 md:pr-1 ml-1 cursor-pointer">
            {comments.length}
          </span>
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
          <span
            className="pr-2 pl-1 cursor-pointer hidden lg:block"
            onClick={handleSave}
          >
            Save
          </span>
        </div>
      </div>

      {/* COMMENTS */}
      <Comments bool={comm} comments={comments} addCom={addCom} user={user} />
    </div>
  );
}
