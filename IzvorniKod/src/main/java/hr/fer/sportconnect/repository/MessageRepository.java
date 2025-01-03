package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationOrderByTimestampAsc(Conversation conversation);
}