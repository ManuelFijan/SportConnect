import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import ReadMore from "../ReadMore";
import { RiAdminLine } from "react-icons/ri";

export default function Comments({ bool, comments, addCom, user }: any) {
  const [input, setInput] = useState("");

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let tmp = new FormData(e.currentTarget);
    let tmp2 = tmp.get("comment") || "";

    setInput("");
    addCom(tmp2);
  };

  const handleDeleteCom = async (comId: any) => {
    try {
      const userEmail = user.email;
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/comment/${comId}?userEmail=${userEmail}`,
        { method: "DELETE" }
      );
      const data = await response.text();
      console.log(data);

      if (response.ok) {
        addCom();
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
        "flex flex-col gap-2 text-gray-700 mb-" + (bool ? "[-1rem]" : "0")
      }
    >
      {/* WRITING */}
      <div className={"flex flex-row gap-2 mb-" + (bool ? "3" : "0")}>
        {user.userType === "ADMIN" ? (
          <RiAdminLine className="border-1 border-gray-700 rounded-full p-1 h-7 w-7" />
        ) : (
          <img
            src={user.profilePicture || "./user.png"}
            alt="user_picture"
            width={20}
            height={20}
            className="rounded-full mt-[0.15rem] text-gray-700 w-5 h-5"
          />
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            name="comment"
            value={input}
            placeholder="Write a comment ..."
            className="w-full text-xs outline-none rounded-lg px-2 py-1 mt-[0.1rem]"
            onChange={handleChange}
          />
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>
      {/* COMMENTS */}
      {bool && comments.length > 0 && (
        <div className="flex flex-col gap-1 w-full text-xs mb-[-0.2rem]">
          {comments.map((comInfo: any, ind: any) => (
            <div className="flex flex-row gap-3  w-full mt-[-1rem]" key={ind}>
              <div>
                {comInfo.user.userType === "ADMIN" ? (
                  <RiAdminLine className="border-1 border-gray-700 rounded-full p-1 h-6 w-6 mt-1" />
                ) : (
                  <img
                    src={comInfo.user.profilePicture || "./user.png"}
                    alt="user_picture"
                    height={24}
                    width={24}
                    className="rounded-full flex-1 w-[1.5rem] h-[1.5rem] mt-1 text-gray-700"
                  />
                )}
              </div>
              <div className="w-[90%] flex flex-col gap-3">
                <span className="font-semibold">
                  {comInfo.user.firstName}{" "}
                  {comInfo.user.userType !== "ADMIN" && comInfo.user.lastName}
                </span>
                <ReadMore message={comInfo.text} post={false} />
              </div>
              {(comInfo.user.userId == user.userId || user.userType === "ADMIN") ? (
                <div className="dropdown">
                  <IoIosMore
                    data-bs-toggle="dropdown"
                    height={16}
                    width={16}
                    className="dropdown-toggle h-6 w-6 mt-1 p-1 rounded-xl hover:bg-gray-300 transition duration-300"
                  />
                  <ul className="dropdown-menu">
                    <li
                      onClick={() => handleDeleteCom(comInfo.commentId)}
                      className="dropdown-item cursor-pointer"
                    >
                      Delete
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
          ))}
        </div>
      )}
    </div>
  );
}
