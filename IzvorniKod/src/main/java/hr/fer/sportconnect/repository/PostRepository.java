package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Post;
import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository for Post entity.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByPartner(User partner);
}
