package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.Message;
import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationOrderByTimestampAsc(Conversation conversation);

    Message findTopByConversationOrderByTimestampDesc(Conversation conversation);

    @Query("SELECT m FROM Message m WHERE m.conversation IN :conversations AND m.timestamp = " + "(SELECT MAX(m2.timestamp) FROM Message m2 WHERE m2.conversation = m.conversation)")
    List<Message> findLatestMessagesForConversations(List<Conversation> conversations);

    @Query("""
                SELECT COUNT(m)
                FROM Message m
                WHERE m.conversation = :conversation
                  AND m.timestamp > :lastRead
                  AND m.sender <> :currentUser
            """)
    int countUnreadMessages(@Param("conversation") Conversation conversation, @Param("lastRead") LocalDateTime lastRead, @Param("currentUser") User currentUser);
}