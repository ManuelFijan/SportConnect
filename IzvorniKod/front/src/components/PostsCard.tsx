import { useState } from "react";
import Comments from "./Comments";
import { FaRegSave, FaSave } from "react-icons/fa";
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoIosMore, IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

export default function PostsCard({ name, pic, message, like, com, user }: any) {
  const [likes, setLikes] = useState(false);
  const [comm, setComm] = useState(true);
  const [saves, setSaves] = useState(false);
  const [likeNum, setLikeNum] = useState(like);
  const [commNum, setCommNum] = useState(com);

  const handleClick1 = () => {
    if (likes) {
      let tmp = like;
      setLikeNum(tmp);
    } else {
      let tmp = like + 1;
      setLikeNum(tmp);
    }
    setLikes(!likes);
  };

  const handleComments = () => {
    let tmp = commNum + 1;
    setCommNum(tmp);
  };

  return (
    <div className="h-auto w-[93%] bg-gray-100 flex flex-col gap-3 mb-4 p-2 rounded-lg">
      {/* USER */}
      <div className="flex flex-row justify-between text-gray-700">
        <div className="flex flex-row gap-2">
          <img
            src={"./user.png"}
            alt="user_picture"
            height={24}
            width={24}
            className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-2 text-gray-700"
          />
          <span className="text-gray-700 mt-2">{name}</span>
        </div>
        <IoIosMore height={16} width={16} className="mt-2"/>
      </div>
      {/* CONTENT */}
      <div className="flex flex-col gap-2">
        <span className="text-gray-700">{message}</span>
        {pic && <img src={pic} alt="food" className="w-full rounded-md" />}
      </div>
      {/* INTERACTION */}
      <div className="flex flex-row justify-between text-xs">
          <div
            className={
              "flex flex-row  bg-white rounded-full p-1 transition duration-300 " +
              (likes ? "text-purple-600 font-semibold" : " text-gray-700")
            }
          >
            {!likes ? (
              <IoIosHeartEmpty
                className="cursor-pointer text-purple-600 mt-[0.1rem] ml-1"
                size={17}
                onClick={handleClick1}
              />
            ) : (
              <IoMdHeart
                className="cursor-pointer text-purple-600 mt-[0.1rem] ml-1"
                size={17}
                onClick={handleClick1}
              />
            )}
            <span className="pr-2 md:pr-0 mt-[0.1rem] ml-1 cursor-pointer" onClick={handleClick1}>
              {likeNum}
            </span>
            <span
              className="mr-1 ml-1 cursor-pointer mt-[0.1rem] hidden md:block"
              onClick={handleClick1}
            >
              Useful
            </span>
          </div>
          <div className="text-gray-700 flex flex-row  bg-white rounded-full p-1">
            <VscCommentDiscussion
              onClick={() => setComm(!comm)}
              className="cursor-pointer text-purple-600 h-5 w-5 mr-1 mt-[0rem] pl-1 ml-1"
            />
            <span className="pr-2 md:pr-1 ml-1 cursor-pointer" onClick={() => setComm(!comm)}>{commNum}</span>
            <span
              className="mr-1 cursor-pointer hidden md:block"
              onClick={() => setComm(!comm)}
            >
              Comments
            </span>
          </div>
        <div
          className={
            "text-gray-700 flex flex-row rounded-full p-1 transition duration-300" +
            (saves ? " bg-purple-600 text-white" : " bg-white")
          }
        >
          {!saves ? (
            <FaRegSave
              onClick={() => setSaves(!saves)}
              className="cursor-pointer text-purple-600 h-4 w-5 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          ) : (
            <FaSave
              onClick={() => setSaves(!saves)}
              className="cursor-pointer h-4 w-5 mr-2 mt-[0.2rem] pl-1 ml-1 md:mr-1"
            />
          )}
          <span
            className="pr-2 pl-1 cursor-pointer hidden md:block"
            onClick={() => setSaves(!saves)}
          >
            Save
          </span>
        </div>
      </div>
      {/* COMMENTS */}
      <Comments bool={comm} addComm={handleComments} user={user}/>
    </div>
  );
}
