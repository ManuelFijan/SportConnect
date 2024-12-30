package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.model.Comment;
import hr.fer.sportconnect.model.Post;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.CommentRepository;
import hr.fer.sportconnect.repository.PostRepository;
import hr.fer.sportconnect.service.PostService;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    public PostServiceImpl(PostRepository postRepository,
                           CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Post createPost(User partner, String textContent, String imageUrl) {
        Post post = new Post(partner, textContent, imageUrl);
        return postRepository.save(post);
    }

    /**
     * Get all posts, optionally sorted by newest, most likes, or most saves.
     *
     * @param sortBy can be "newest", "mostLikes", or "mostSaves".
     */
    @Override
    public List<Post> getAllPosts(String sortBy) {
        List<Post> posts = postRepository.findAll();

        if (sortBy == null || sortBy.isBlank()) {
            // Default: return unsorted
            return posts;
        }

        switch (sortBy.toLowerCase()) {
            case "newest":
                // Sort by createdAt descending
                return posts.stream()
                        .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                        .collect(Collectors.toList());

            case "mostlikes":
                // Sort by likedBy descending
                return posts.stream()
                        .sorted(Comparator.comparingInt((Post p) -> p.getLikedBy().size())
                                .reversed())
                        .collect(Collectors.toList());

            case "mostsaves":
                // Sort by savedBy descending
                return posts.stream()
                        .sorted(Comparator.comparingInt((Post p) -> p.getSavedBy().size())
                                .reversed())
                        .collect(Collectors.toList());

            default:
                return posts;
        }
    }

    @Override
    public Post likePost(Long postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        // Check if the user has already liked the post
        if (!post.getLikedBy().contains(user)) {
            post.getLikedBy().add(user);
            post.incrementLikeCount();
            return postRepository.save(post);
        } else {
            // Unlike
            post.getLikedBy().remove(user);
            post.decrementLikeCount();
            return postRepository.save(post);
        }
    }

    @Override
    public Post savePost(Long postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        // Check if the user has already saved the post
        if (!post.getSavedBy().contains(user)) {
            post.getSavedBy().add(user);
        } else {
            post.getSavedBy().remove(user);
        }

        return postRepository.save(post);
    }

    @Override
    public Comment addComment(Long postId, User user, String commentText) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        Comment comment = new Comment(post, user, commentText);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsForPost(Long postId) {
        return commentRepository.findAll()
                .stream()
                .filter(c -> c.getPost().getPostId().equals(postId))
                .toList();
    }

    @Override
    public List<Post> getSavedPostsForUser(User user) {
        return postRepository.findAll()
                .stream()
                .filter(post -> post.getSavedBy().contains(user))
                .toList();
    }
}
