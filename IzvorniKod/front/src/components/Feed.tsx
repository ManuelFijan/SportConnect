import PostsCard from "./PostsCard";
import list from "../../public/posts.json";

export default function Feed({ user, newData }: any) {
  const data = newData;
  console.log(data);  

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] h-auto bg-white rounded-lg flex flex-col justify-center items-center pt-3">
      {list.map((item, ind) => (
        <PostsCard
          name={item[0]}
          pic={item[1]}
          message={item[2]}
          like={item[3]}
          com={item[4]}
          key={ind}
          preview={false}
          user={user}
        />
      ))}
    </div>
  );
}
