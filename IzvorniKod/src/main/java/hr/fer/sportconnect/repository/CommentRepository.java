package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Comment entity.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
