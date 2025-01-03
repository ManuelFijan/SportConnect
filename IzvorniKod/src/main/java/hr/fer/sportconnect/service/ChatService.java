package hr.fer.sportconnect.service;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import hr.fer.sportconnect.model.User;

import java.util.List;
import java.util.Optional;

public interface ChatService {
    Conversation createConversation(User user1, User user2);
    List<Conversation> getUserConversations(User user);
    Message sendMessage(User sender, Long conversationId, String content);
    List<Message> getConversationMessages(Long conversationId);
}
