package hr.fer.sportconnect.controller;

import hr.fer.sportconnect.db.SupabaseS3Service;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.model.Comment;
import hr.fer.sportconnect.model.Post;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Controller for managing posts, likes, comments, and saved posts.
 */
@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = {"http://localhost:3000", "https://sportconnect-8b7o.onrender.com"}, allowCredentials = "true")
public class PostController {

    private final PostService postService;
    private final UserRepository userRepository;
    private final SupabaseS3Service supabaseS3Service;

    public PostController(PostService postService, UserRepository userRepository, SupabaseS3Service supabaseS3Service) {
        this.postService = postService;
        this.userRepository = userRepository;
        this.supabaseS3Service = supabaseS3Service;
    }

    /**
     * Create a post
     */
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(@RequestParam String userEmail, @RequestParam String textContent, @RequestPart(value = "file", required = false) MultipartFile file) {
        // Get the user
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        // Only Partner can create a post
        if (user.getUserType() != UserType.PARTNER) {
            return ResponseEntity.badRequest().body("Only a Partner can create posts.");
        }

        // If file is present, upload to supabase
        String imageUrl = null;
        if (file != null && !file.isEmpty()) {
            try {
                // Generate a unique filename using UUID
                String uniqueFilename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
                String bucketName = "slike";
                String objectKey = uniqueFilename;

                // Save the MultipartFile to a temporary location
                File tempFile = File.createTempFile("upload-", "-" + uniqueFilename);
                try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                    fos.write(file.getBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }

                // Upload the file to Supabase Storage
                supabaseS3Service.uploadFile(bucketName, objectKey, tempFile.getAbsolutePath());

                // Delete the temporary file
                tempFile.delete();

                // Construct the public URL
                imageUrl = "https://pccmxztqfmfucdbgcydr.supabase.co/storage/v1/object/public/" + bucketName + "/" + objectKey;
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Failed to upload image.");
            }
        }

        // Create the Post in DB
        Post newPost = postService.createPost(user, textContent, imageUrl);

        // Return the newly created post
        return ResponseEntity.ok(newPost);
    }


    /**
     * Get all posts with optional sorting.
     * sortBy can be "newest", "mostLikes", or "mostSaves".
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(@RequestParam(required = false) String sortBy) {
        List<Post> posts = postService.getAllPosts(sortBy);
        return ResponseEntity.ok(posts);
    }

    /**
     * Like a post
     */
    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @RequestParam String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        Post likedPost = postService.likePost(postId, user);
        return ResponseEntity.ok(likedPost);
    }

    /**
     * Save a post
     */
    @PostMapping("/{postId}/save")
    public ResponseEntity<Post> savePost(@PathVariable Long postId, @RequestParam String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        Post savedPost = postService.savePost(postId, user);
        return ResponseEntity.ok(savedPost);
    }

    /**
     * View all saved posts of a particular user
     */
    @GetMapping("/saved")
    public ResponseEntity<List<Post>> getSavedPosts(@RequestParam String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        List<Post> savedPosts = postService.getSavedPostsForUser(user);
        return ResponseEntity.ok(savedPosts);
    }

    /**
     * Comment on a post
     */
    @PostMapping("/{postId}/comment")
    public ResponseEntity<Comment> commentOnPost(@PathVariable Long postId, @RequestParam String userEmail, @RequestParam String commentText) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

        Comment comment = postService.addComment(postId, user, commentText);
        return ResponseEntity.ok(comment);
    }

    /**
     * Get comments for a post
     */
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        List<Comment> comments = postService.getCommentsForPost(postId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getPostsByUserEmail(@RequestParam String userEmail) {
        try {
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            List<Post> userPosts = postService.getPostsByUser(user);

            return ResponseEntity.ok(userPosts);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching posts.");
        }
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @RequestParam String userEmail) {
        try {
            // Fetch the user
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // Delete the comment
            postService.deleteComment(commentId, user);

            return ResponseEntity.ok("Comment deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the comment.");
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId, @RequestParam String userEmail) {
        try {
            // Fetch the user
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));

            // Delete the post
            postService.deletePost(postId, user);

            return ResponseEntity.ok("Post deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while deleting the post.");
        }
    }

}
