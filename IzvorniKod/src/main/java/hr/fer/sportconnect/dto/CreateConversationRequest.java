package hr.fer.sportconnect.dto;

public class CreateConversationRequest {
    private String recipientEmail;

    // Constructors
    public CreateConversationRequest() {}

    public CreateConversationRequest(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    // Getter and Setter
    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }
}
