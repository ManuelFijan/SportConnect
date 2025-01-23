package hr.fer.sportconnect.controller;

import com.pusher.rest.Pusher;
import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ConversationRepository;
import hr.fer.sportconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/pusher")
public class PusherAuthController {

    @Autowired
    private Pusher pusher;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Authenticate a user for subscribing to a private channel.
     */
    @PostMapping("/auth")
    public ResponseEntity<String> authenticate(@RequestParam String channel_name,
                                               @RequestParam String socket_id,
                                               Principal principal) {
        // Extract conversation ID from channel name
        if (!channel_name.startsWith("private-conversation-")) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        Long conversationId;
        try {
            conversationId = Long.parseLong(channel_name.replace("private-conversation-", ""));
        } catch (NumberFormatException e) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        // Retrieve the conversation
        Optional<Conversation> conversationOpt = conversationRepository.findById(conversationId);
        if (!conversationOpt.isPresent()) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        Conversation conversation = conversationOpt.get();

        // Retrieve the authenticated user
        Optional<User> userOpt = userRepository.findByEmail(principal.getName());
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        User user = userOpt.get();

        // Check if the user is part of the conversation
        if (!conversation.getParticipants().contains(user)) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        // Authenticate the user for the channel
        String auth = pusher.authenticate(socket_id, channel_name);
        return ResponseEntity.ok(auth);
    }
}