package hr.fer.sportconnect.controller;

import hr.fer.sportconnect.dto.ConversationWithLastMessageDTO;
import hr.fer.sportconnect.dto.CreateConversationRequest;
import hr.fer.sportconnect.dto.SendMessageRequest;
import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatController {
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private final ChatService chatService;
    private final UserRepository userRepository;

    public ChatController(ChatService chatService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }

    /**
     * Create a new conversation or get existing one between two users
     */
    @PostMapping("/conversations")
    public ResponseEntity<ConversationWithLastMessageDTO> createConversation(@RequestBody CreateConversationRequest request, Principal principal) {
        if (principal == null) {
            logger.error("Principal is null. Unauthorized access attempt.");
            return ResponseEntity.status(401).build(); // Unauthorized
        }

        logger.info("Creating or fetching conversation between {} and {}", principal.getName(), request.getRecipientEmail());

        Optional<User> sender = userRepository.findByEmail(principal.getName());
        Optional<User> recipient = userRepository.findByEmail(request.getRecipientEmail());
        if (!sender.isPresent() || !recipient.isPresent()) {
            logger.error("Sender or recipient not found. Sender present: {}, Recipient present: {}", sender.isPresent(), recipient.isPresent());
            return ResponseEntity.badRequest().build();
        }

        try {
            Conversation conversation = chatService.createConversation(sender.get(), recipient.get());
            // Fetch the ConversationWithLastMessageDTO for the created conversation
            List<ConversationWithLastMessageDTO> dtos = chatService.getUserConversationsWithLastMessage(sender.get());
            Optional<ConversationWithLastMessageDTO> convoDTOOpt = dtos.stream()
                    .filter(dto -> dto.getConversationId().equals(conversation.getId()))
                    .findFirst();
            if (convoDTOOpt.isPresent()) {
                logger.info("Conversation created/fetched with ID: {}", conversation.getId());
                return ResponseEntity.ok(convoDTOOpt.get());
            } else {
                logger.error("Failed to map conversation to DTO");
                return ResponseEntity.status(500).build();
            }
        } catch (Exception e) {
            logger.error("Error creating conversation: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Get all conversations for the authenticated user along with the latest message in each conversation
     */
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationWithLastMessageDTO>> getConversations(Principal principal) {
        if (principal == null) {
            logger.error("Principal is null. Unauthorized access attempt.");
            return ResponseEntity.status(401).build();
        }

        Optional<User> userOpt = userRepository.findByEmail(principal.getName());
        if (!userOpt.isPresent()) {
            logger.error("Authenticated user not found: {}", principal.getName());
            return ResponseEntity.badRequest().build();
        }
        User user = userOpt.get();
        try {
            List<ConversationWithLastMessageDTO> conversationsWithLastMessages = chatService.getUserConversationsWithLastMessage(user);
            logger.info("Fetched {} conversations with last messages for user: {}", conversationsWithLastMessages.size(), user.getEmail());
            return ResponseEntity.ok(conversationsWithLastMessages);
        } catch (Exception e) {
            logger.error("Error fetching conversations with last messages: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Send a message in a conversation
     */
    @PostMapping("/messages")
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request, Principal principal) {
        Optional<User> sender = userRepository.findByEmail(principal.getName());
        if (!sender.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Message message = chatService.sendMessage(sender.get(), request.getConversationId(), request.getContent());
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            logger.error("Error sending message: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Get messages for a conversation
     */
    @GetMapping("/messages/{conversationId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long conversationId, Principal principal) {
        List<Message> messages = chatService.getConversationMessages(conversationId);
        return ResponseEntity.ok(messages);
    }
}