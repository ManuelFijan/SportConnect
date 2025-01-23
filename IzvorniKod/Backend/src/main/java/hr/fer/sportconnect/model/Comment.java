package hr.fer.sportconnect.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Comment on a post
 */
@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    /**
     * Post to which this comment belongs
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    @JsonBackReference
    private Post post;

    /**
     * User who made this comment
     */
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Comment() {
    }

    public Comment(Post post, User user, String text) {
        this.post = post;
        this.user = user;
        this.text = text;
        this.createdAt = LocalDateTime.now();
    }

    public Long getCommentId() {
        return commentId;
    }

    public Post getPost() {
        return post;
    }

    public User getUser() {
        return user;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
