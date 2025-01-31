package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.db.SupabaseS3Service;
import hr.fer.sportconnect.enums.SubscriptionPlan;
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
    private final SupabaseS3Service supabaseS3Service;

    public PostServiceImpl(PostRepository postRepository,
                           CommentRepository commentRepository, SupabaseS3Service supabaseS3Service) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.supabaseS3Service = supabaseS3Service;
    }

    @Override
    public Post createPost(User partner, String textContent, String imageUrl, SubscriptionPlan tier) {
        Post post = new Post(partner, textContent, imageUrl, tier);
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

    @Override
    public List<Post> getPostsByUser(User user) {
        return postRepository.findByPartner(user);
    }

    @Override
    public void deletePost(Long postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        boolean isAdmin = user.getEmail().equalsIgnoreCase("admin@admin.com");

        if (!isAdmin && !post.getPartner().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this post.");
        }

        // delete associated comments
        commentRepository.deleteAll(getCommentsForPost(postId));

        // If the post has an image, delete it from Supabase
        if (post.getImageUrl() != null) {
            String bucketName = "slike";
            String objectKey = post.getImageUrl().substring(post.getImageUrl().lastIndexOf("/") + 1);
            supabaseS3Service.deleteFile(bucketName, objectKey);
        }

        postRepository.delete(post);
    }

    @Override
    public void deleteComment(Long commentId, User user) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        boolean isAdmin = user.getEmail().equalsIgnoreCase("admin@admin.com");

        // If user is not the commenter and also not admin, can't delete
        if (!isAdmin && !comment.getUser().equals(user)) {
            throw new RuntimeException("You are not authorized to delete this comment.");
        }

        commentRepository.delete(comment);
    }

    public List<Post> getAvailablePostsForUser(User user, String sortBy) {
        // Determine which plans the user has access to
        List<SubscriptionPlan> allowedPlans = user.getSubscriptionPlan().accessiblePlans();

        // Get only posts from those plans
        List<Post> filteredPosts = postRepository.findByTierIn(allowedPlans);

        return sortPosts(filteredPosts, sortBy);
    }

    private List<Post> sortPosts(List<Post> posts, String sortBy) {
        if (sortBy == null || sortBy.isBlank()) {
            return posts;
        }
        switch (sortBy.toLowerCase()) {
            case "newest":
                return posts.stream()
                        .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                        .collect(Collectors.toList());
            case "mostlikes":
                return posts.stream()
                        .sorted(Comparator.comparingInt((Post p) -> p.getLikedBy().size())
                                .reversed())
                        .collect(Collectors.toList());
            case "mostsaves":
                return posts.stream()
                        .sorted(Comparator.comparingInt((Post p) -> p.getSavedBy().size())
                                .reversed())
                        .collect(Collectors.toList());
            default:
                return posts;
        }
    }

}
