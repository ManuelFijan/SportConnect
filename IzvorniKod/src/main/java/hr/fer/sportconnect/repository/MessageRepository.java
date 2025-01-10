package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationOrderByTimestampAsc(Conversation conversation);
    Message findTopByConversationOrderByTimestampDesc(Conversation conversation);
    @Query("SELECT m FROM Message m WHERE m.conversation IN :conversations AND m.timestamp = " +
            "(SELECT MAX(m2.timestamp) FROM Message m2 WHERE m2.conversation = m.conversation)")
    List<Message> findLatestMessagesForConversations(List<Conversation> conversations);
}