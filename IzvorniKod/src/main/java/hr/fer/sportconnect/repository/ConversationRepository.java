package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Conversation;
import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByParticipantsContaining(User user);

    @Query("SELECT c FROM Conversation c JOIN c.participants p1 JOIN c.participants p2 WHERE p1 = :user1 AND p2 = :user2 AND SIZE(c.participants) = 2")
    Optional<Conversation> findConversationBetweenUsers(User user1, User user2);
}
