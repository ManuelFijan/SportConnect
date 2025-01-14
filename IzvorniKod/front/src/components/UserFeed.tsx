import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { User } from "../types/User";

export default function UserFeed({ openUser, updateUser, update}: any) {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_API}/users/all`;
      const response = await fetch(url);
      if (response.ok) {
        const data: User[] = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch user posts.111");
      }
    } catch (error) {
      console.error("Error fetching user posts:111", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [update]);

  return (
    <div className="w-[95%] md:bg-white rounded-lg flex flex-col justify-center items-center">
      {/* Posts list */}
      {users.map((user) => (
        <UserCard
          key={user.email}
          id={user.id}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          profilePicture={user.profilePicture}
          userName={user.userName}
          userType={user.userType}
          subscriptionPlan={user.subscriptionPlan}
          openUser={openUser}
          updateUser={updateUser}
        />
      ))}
    </div>
  );
}
