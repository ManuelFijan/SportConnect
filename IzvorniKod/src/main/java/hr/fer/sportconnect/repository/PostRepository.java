package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
