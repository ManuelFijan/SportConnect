import { useState, useContext } from 'react';
import '../styles/PostsCard.css';
import defaultProfilePicture from '/user.png';
import imageCompression from 'browser-image-compression';
import { AuthContext } from "../context/AuthContext";

function AddPost() {
    const { user } = useContext(AuthContext);
    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
                console.error('Error compressing the image:', error);
                alert('Failed to compress the image. Please try another image.');
            }
        }
    };

    const handlePost = async () => {
        if (!postContent && !selectedImage) {
            alert('Please add some content or an image!');
            return;
        }

        if (!user) {
			alert("User data not available.");
			return;
		}

        const formData = new FormData();
        formData.append('userEmail', user.email);
        formData.append('textContent', postContent);
        if (selectedImage) {
            formData.append('file', selectedImage);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/posts/create`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Post created:', result);

            setPostContent('');
            setSelectedImage(null);
            alert('Post successfully created!');
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Failed to create post. Please try again later.');
        }
    };

    return (
        <div className="add-post-container w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] pt-4 md:pt-5 px-3">
            <div className="image-text-container">
                <div className="image-div">
                    {user ? (
                            <img
                                src={user.profilePicture || defaultProfilePicture}
                                alt="Profile"
                                className="img2"
                            />
                        ) : (
                            <img
                                src={defaultProfilePicture}
                                alt="Default Profile"
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
                />
            </div>

            <div className="image-upload">
                <label htmlFor="file-upload" className="custom-file-upload">
                    Upload Image
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
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

            <button className="post-button" onClick={handlePost}>
                Post it!
            </button>
        </div>
    );
}

export default AddPost;