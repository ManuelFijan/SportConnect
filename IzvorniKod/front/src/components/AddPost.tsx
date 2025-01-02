import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/PostsCard.css';
import defaultProfilePicture from '/user.png';

interface User {
    username: string;
    profilePicture?: string;
}

interface Post {
    id: number;
    user: User;
    image: string;
    status: string;
    likes: number;
}

function AddPost() {
    const location = useLocation();
    const { user } = location.state || {};
    const [updatedUser, setUpdatedUser] = useState(user);

    const [postContent, setPostContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<string>(''); // State for image
    const [posts, setPosts] = useState<Post[]>([]);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setSelectedImage(reader.result as string); // Update state with the preview
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePost = () => {
        if (!postContent && !selectedImage) {
            alert('Please add some content or an image!');
            return;
        }

        const newPost: Post = {
            id: posts.length + 1,
            user: {
                username: updatedUser.firstName + " " + updatedUser.lastName || 'Anonymous',
                profilePicture: updatedUser.profilePicture || defaultProfilePicture,
            },
            image: selectedImage,
            status: postContent,
            likes: 0,
        };

        setPosts([newPost, ...posts]);
        setPostContent('');
        setSelectedImage('');
    };

    const handleLike = (postId: number) => {
        const updatedPosts = posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);
    };

    return (
        <div className="add-post-container w-[90%] sm:w-[80%] md:w-[75%] lg:w-[70%] pt-4 md:pt-5 px-3">
            <div className="image-text-container">
                <div className="image-div">
                    <img
                        src={updatedUser.profilePicture || defaultProfilePicture}
                        alt="Profile"
                        className="img2"
                    />
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
                    <img src={selectedImage} alt="Preview" className="preview-image" />
                </div>
            )}

            <button className="post-button" onClick={handlePost}>
                Post it!
            </button>

{/*            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <div className="post-header">
                            <img
                                src={post.user.profilePicture}
                                alt={`${post.user.username}'s profile`}
                                className="img4"
                            />
                            <span>{post.user.username}</span>
                        </div>
                        <div className="tekst">{post.status}</div>
                        {post.image && <img src={post.image} alt="Post" className="post-image" />}
                        <div className="post-actions">
                            <button onClick={() => handleLike(post.id)}>Like</button>
                            <span>{post.likes} Likes</span>
                        </div>
                    </div>
                ))}
            </div>*/}
        </div>
    );
}

export default AddPost;
