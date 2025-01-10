package hr.fer.sportconnect.service.impl;

import com.pusher.rest.Pusher;
import hr.fer.sportconnect.dto.ConversationWithLastMessageDTO;
import hr.fer.sportconnect.dto.MessageDTO;
import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ConversationRepository;
import hr.fer.sportconnect.repository.MessageRepository;
import hr.fer.sportconnect.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final Pusher pusher;

    @Autowired
    public ChatServiceImpl(ConversationRepository conversationRepository,
                           MessageRepository messageRepository, Pusher pusher) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.pusher = pusher;
    }

    @Override
    public Conversation createConversation(User user1, User user2) {
        // Check if conversation already exists between these users
        Optional<Conversation> existingConversation = conversationRepository.findConversationBetweenUsers(user1, user2);
        if (existingConversation.isPresent()) {
            return existingConversation.get();
        }

        // Create new conversation
        Conversation conversation = new Conversation();
        conversation.getParticipants().add(user1);
        conversation.getParticipants().add(user2);
        return conversationRepository.save(conversation);
    }

    @Override
    public List<Conversation> getUserConversations(User user) {
        return conversationRepository.findByParticipantsContaining(user);
    }

    @Override
    public Message sendMessage(User sender, Long conversationId, String content) {
        // Fetch the conversation
        Optional<Conversation> convoOpt = conversationRepository.findById(conversationId);
        if (!convoOpt.isPresent()) {
            throw new RuntimeException("Conversation not found");
        }
        Conversation conversation = convoOpt.get();

        // Create and save the message
        Message message = new Message();
        message.setContent(content);
        message.setConversation(conversation);
        message.setSender(sender);
        message.setTimestamp(LocalDateTime.now());

        messageRepository.save(message);

        // Convert Message to MessageDTO
        MessageDTO dto = new MessageDTO(message.getId(), message.getContent(), conversationId, sender.getEmail(), message.getTimestamp().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        // Trigger the Pusher event with MessageDTO
        pusher.trigger("private-conversation-" + conversationId, "new-message", dto);

        return message;
    }

    @Override
    public List<Message> getConversationMessages(Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow(() -> new RuntimeException("Conversation not found"));
        return messageRepository.findByConversationOrderByTimestampAsc(conversation);
    }

    @Override
    public List<ConversationWithLastMessageDTO> getUserConversationsWithLastMessage(User user) {
        // Fetch all conversations the user is part of
        List<Conversation> conversations = conversationRepository.findByParticipantsContaining(user);


        if (conversations.isEmpty()) {
            return Collections.emptyList();
        }

        // Fetch all latest messages
        List<Message> latestMessages = messageRepository.findLatestMessagesForConversations(conversations);

        // Map conversation ID to its latest message
        Map<Long, Message> conversationLastMessageMap = latestMessages.stream().collect(Collectors.toMap(m -> m.getConversation().getId(), m -> m));


        List<ConversationWithLastMessageDTO> conversationDTOs = conversations.stream().map(conversation -> {
            Message lastMessage = conversationLastMessageMap.get(conversation.getId());

            Optional<User> otherParticipantOpt = conversation.getParticipants().stream()
                    .filter(participant -> !participant.getEmail().equals(user.getEmail()))
                    .findFirst();

            String participantEmail = otherParticipantOpt.map(User::getEmail).orElse("Unknown");
            String participantProfilePicture = otherParticipantOpt.map(User::getProfilePicture).orElse("/user.png");

            if (lastMessage != null) {
                return new ConversationWithLastMessageDTO(
                        conversation.getId(),
                        participantEmail,
                        lastMessage.getContent(),
                        lastMessage.getTimestamp().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                        lastMessage.getSender().getEmail(),
                        participantProfilePicture
                );
            } else {
                // No messages in the conversation yet
                return new ConversationWithLastMessageDTO(
                        conversation.getId(),
                        participantEmail,
                        null,
                        null,
                        null,
                        participantProfilePicture
                );
            }
        }).collect(Collectors.toList());

        return conversationDTOs;
    }
}