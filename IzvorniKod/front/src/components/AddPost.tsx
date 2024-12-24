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

function AddPost(){
    const location = useLocation();
    const { user } = location.state || {};
    const [updatedUser, setUpdatedUser] = useState(user);

    const [postContent, setPostContent] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(event.target.value);
    };

    const handlePost = () => {
        if (!postContent) {
            alert('Please add some content!');
            return;
        }

        const newPost: Post = {
            id: posts.length + 1,
            user: {
                username: updatedUser.firstName + " " + updatedUser.lastName || 'Anonymous',
                profilePicture: updatedUser.profilePicture || defaultProfilePicture,
            },
            image: '', 
            status: postContent,
            likes: 0,
        };

        setPosts([newPost, ...posts]); // dodaj post na vrh
        setPostContent(''); // isprazni input
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

            <button className="post-button" onClick={handlePost}>
                Post it!
            </button>

            <div className="posts-list">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <div className="post-header">
                            <img
                                src={post.user.profilePicture}
                                alt={post.user.username+"'s profile"}
                                className="img4"
                            />
                            <span>{post.user.username}</span>
                        </div>
                        <div className="tekst">{post.status}</div>
                        <div className="post-actions">
                            <button onClick={() => handleLike(post.id)}>Like</button>
                            <span>{post.likes} Likes</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddPost;