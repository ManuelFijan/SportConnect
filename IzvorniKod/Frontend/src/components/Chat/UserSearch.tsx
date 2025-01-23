import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface UserSearchProps {
  onUserSelect: (user: any) => void;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserSearch: React.FC<UserSearchProps> = ({
  onUserSelect,
  setIsSearching,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const handleSearch = () => {
    const token = localStorage.getItem("token");

    fetch(
      `${import.meta.env.VITE_BACKEND_API}/users/search?query=${encodeURIComponent(searchTerm)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please log in.");
          }
          throw new Error("Failed to search users.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
        alert(error.message);
      });
  };

  return (
    <div className="p-2">
      {/*gumb za vratiti se nazad*/}
      <button
        onClick={() => setIsSearching(false)}
        className="mb-[2rem] flex gap-2 cursor-pointer px-2 pt-2 rounded-lg bg-[#b05959] hover:bg-[#713939] text-white transition duration-200"
      >
        <FiArrowLeft size={30} />
        <p className="font-semibold mt-[0.1rem]">Back</p>
      </button>

      <div className="flex justify-center">
        <p className="text-gray-600 text-[15px] md:text-lg font-semibold mt-2">
          Find a new person you want to chat with!!!
        </p>
      </div>

      <input
        type="text"
        placeholder="Search users by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 ring-1 ring-[#a19a9a] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mb-2"
      />

      <button
        onClick={handleSearch}
        className="w-full bg-[#936ff6] hover:bg-[#5434ab] text-white p-2 rounded"
      >
        Search
      </button>

      <ul className="max-h-72 overflow-y-auto mt-3 scrollbar scrollbar-thumb-[#5434ab] scrollbar-track-transparent">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onUserSelect(user)}
            className="p-1 cursor-pointer text-black flex items-center gap-3 text-[13px] md:text-base"
          >
            <img
              src={user.profilePicture || "/user.png"}
              alt={user.firstName || "Users pic"}
              className="w-12 h-12 rounded-full object-cover"
              title={user.userName} // kada se postavi mis na sliku prikaze se username osobe s kojom pricas
            />
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
