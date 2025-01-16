import { useState, useContext } from "react";
import "../../styles/PostsCard.css";
import defaultProfilePicture from "/user.png";
import imageCompression from "browser-image-compression";
import { AuthContext } from "../../context/AuthContext";
import { RiAdminLine, RiImageAddLine } from "react-icons/ri";

function AddPost({ handleUpdate }: any) {
  const { user } = useContext<any>(AuthContext);
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [rank, setRank] = useState("FREE");

  const ranks = ["FREE", "BRONZE", "SILVER", "GOLD"];

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInMB = 5; // Maximum file size in MB
      const options = {
        maxSizeMB: maxSizeInMB,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setSelectedImage(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
        alert("Failed to compress the image. Please try another image.");
      }
    }
  };

  const handleRank = (e: any) => {
    setRank(e.target.value);
  };

  const handlePost = async () => {
    if (!postContent && !selectedImage) {
      alert("Please add some content or an image!");
      return;
    }

    if (!user) {
      alert("User data not available.");
      return;
    }

    const formData = new FormData();
    formData.append("userEmail", user.email);
    formData.append("textContent", postContent);
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    formData.append("tier", rank);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/posts/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Post created:", result);
      handleUpdate();

      setPostContent("");
      setSelectedImage(null);
      alert("Post successfully created!");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again later.");
    }
  };


  return (
    <div className="add-post-container w-full pt-4 md:pt-5 px-3 bg-[#535e6d]">
      <div className="image-text-container">
        <div className="image-div">
          {user?.userType === "ADMIN" ? (
            <RiAdminLine className="img2 rounded-full border-1 border-gray-700 p-2 text-gray-700 bg-white" />
          ) : (
            <img
              src={user?.profilePicture || defaultProfilePicture}
              alt="Profile"
              className="img2"
            />
          )}
        </div>
      </div>

      <div className="textarea-container">
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={handleTextChange}
          className="text-gray-500 p-1"
        />
      </div>
      
      {/* gumbi za biranje ranka objave */}
      <div className="flex gap-1 text-gray-700 w-full">
        <label
          htmlFor="file-upload"
          className={
            "image-upload gap-2 py-[6px] hover:text-gray-500" +
            (user.subscriptionPlan === "FREE" ? (user.userType === "ADMIN" ? " w-[42%]" : " w-full") : " w-[42%]")
          }
        >
          <RiImageAddLine />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <p className="mt-0 mb-0 text-xs xs:text-base">Add image</p>
        </label>
        {ranks.map(
          (rank) =>
            (ranks.indexOf(rank) <= ranks.indexOf(user.subscriptionPlan) || user.userType === "ADMIN") &&
            (user.subscriptionPlan !== "FREE" || user.userType === "ADMIN") && (
              <label
                key={rank}
                className="has-[:checked]:bg-[#97a6b9] has-[:checked]:text-gray-100 text-gray-500 text-xs xs:text-sm hover:bg-[#d3e0f0] transition duration-300 hover:text-gray-500 bg-[#ffff] border-1 border-gray-300 rounded-md w-[3.5rem] xs:w-[5rem] h-9 flex justify-center items-center cursor-pointer"
              >
                <input
                  type="radio"
                  className="opacity-0 absolute cursor-pointer"
                  name="description"
                  value={rank}
                  onChange={handleRank}
                  required
                />
                {rank}
              </label>
            )
        )}
      </div>

      {selectedImage && (
        <div className="image-preview">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="preview-image"
          />
        </div>
      )}

      <button
        className="post-button bg-[#5643CC] hover:bg-[#40319e]"
        onClick={handlePost}
      >
        Post it!
      </button>
    </div>
  );
}

export default AddPost;
