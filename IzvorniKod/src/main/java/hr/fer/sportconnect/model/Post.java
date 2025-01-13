package hr.fer.sportconnect.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    /**
     * The partner who created this post
     */
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User partner;

    @Column(columnDefinition = "TEXT")
    private String textContent;

    private String imageUrl;

    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Link posts to the users who liked them
     */
    @ManyToMany
    @JoinTable(name = "post_likes", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> likedBy = new HashSet<>();

    /**
     * Link posts to the users who saved them
     */
    @ManyToMany
    @JoinTable(name = "saved_posts", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> savedBy = new HashSet<>();

    @Column(name="like_count", nullable = false)
    private int likeCount = 0;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Comment> comments = new HashSet<>();
    @Enumerated(EnumType.STRING)
    @Column(name="post_tier")
    private SubscriptionPlan tier;

    public Post() {
    }

    public Post(User partner, String textContent, String imageUrl, SubscriptionPlan tier) {
        this.partner = partner;
        this.textContent = textContent;
        this.imageUrl = imageUrl;
        this.createdAt = LocalDateTime.now();
        this.tier = tier;
    }

    public Long getPostId() {
        return postId;
    }

    public User getPartner() {
        return partner;
    }

    public void setPartner(User partner) {
        this.partner = partner;
    }

    public String getTextContent() {
        return textContent;
    }

    public void setTextContent(String textContent) {
        this.textContent = textContent;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Set<User> getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(Set<User> likedBy) {
        this.likedBy = likedBy;
    }

    public Set<User> getSavedBy() {
        return savedBy;
    }

    public void setSavedBy(Set<User> savedBy) {
        this.savedBy = savedBy;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public SubscriptionPlan getTier() {
        return tier;
    }

    public void setTier(SubscriptionPlan tier) {
        this.tier = tier;
    }

    public void incrementLikeCount() {
        this.likeCount++;
    }

    public void decrementLikeCount() {
        if (this.likeCount > 0) {
            this.likeCount--;
        }
    }
}

