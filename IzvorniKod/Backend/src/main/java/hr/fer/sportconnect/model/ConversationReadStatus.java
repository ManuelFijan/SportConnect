package hr.fer.sportconnect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "conversation_read_status")
public class ConversationReadStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "last_read_timestamp", nullable = false)
    private LocalDateTime lastReadTimestamp;

    public ConversationReadStatus() {}

    public ConversationReadStatus(Conversation conversation, User user, LocalDateTime lastReadTimestamp) {
        this.conversation = conversation;
        this.user = user;
        this.lastReadTimestamp = lastReadTimestamp;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getLastReadTimestamp() {
        return lastReadTimestamp;
    }

    public void setLastReadTimestamp(LocalDateTime lastReadTimestamp) {
        this.lastReadTimestamp = lastReadTimestamp;
    }
}
