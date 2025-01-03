package hr.fer.sportconnect.service;

import hr.fer.sportconnect.model.Post;
import hr.fer.sportconnect.model.Comment;
import hr.fer.sportconnect.model.User;
import java.util.List;

public interface PostService {
    Post createPost(User partner, String textContent, String imageUrl);
    List<Post> getAllPosts(String sortBy);
    Post likePost(Long postId, User user);
    Post savePost(Long postId, User user);
    Comment addComment(Long postId, User user, String commentText);
    List<Comment> getCommentsForPost(Long postId);
    List<Post> getSavedPostsForUser(User user);
}
