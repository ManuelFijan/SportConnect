package hr.fer.sportconnect.dto;

public class ConversationWithLastMessageDTO {
    private Long conversationId;
    private String participantEmail;
    private String lastMessageContent;
    private String lastMessageTimestamp;
    private String senderEmail;
    private String profileImage;

    public ConversationWithLastMessageDTO() {}

    public ConversationWithLastMessageDTO(Long conversationId, String participantEmail, String lastMessageContent, String lastMessageTimestamp, String senderEmail, String profileImage) {
        this.conversationId = conversationId;
        this.participantEmail = participantEmail;
        this.lastMessageContent = lastMessageContent;
        this.lastMessageTimestamp = lastMessageTimestamp;
        this.senderEmail = senderEmail;
        this.profileImage = profileImage;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public String getParticipantEmail() {
        return participantEmail;
    }

    public void setParticipantEmail(String participantEmail) {
        this.participantEmail = participantEmail;
    }

    public String getLastMessageContent() {
        return lastMessageContent;
    }

    public void setLastMessageContent(String lastMessageContent) {
        this.lastMessageContent = lastMessageContent;
    }

    public String getLastMessageTimestamp() {
        return lastMessageTimestamp;
    }

    public void setLastMessageTimestamp(String lastMessageTimestamp) {
        this.lastMessageTimestamp = lastMessageTimestamp;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
