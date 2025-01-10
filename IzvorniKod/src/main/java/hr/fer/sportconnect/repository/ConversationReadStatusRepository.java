package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.ConversationReadStatus;
import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConversationReadStatusRepository extends JpaRepository<ConversationReadStatus, Long> {
    Optional<ConversationReadStatus> findByConversationAndUser(Conversation conversation, User user);
}
