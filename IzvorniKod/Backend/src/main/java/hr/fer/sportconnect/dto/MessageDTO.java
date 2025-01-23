package hr.fer.sportconnect.dto;

import java.time.LocalDateTime;

public class MessageDTO {
    private Long id;
    private String content;
    private Long conversationId;
    private String senderEmail;
    private String timestamp;

    public MessageDTO() {}

    public MessageDTO(Long id, String content, Long conversationId, String senderEmail, String timestamp) {
        this.id = id;
        this.content = content;
        this.conversationId = conversationId;
        this.senderEmail = senderEmail;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
