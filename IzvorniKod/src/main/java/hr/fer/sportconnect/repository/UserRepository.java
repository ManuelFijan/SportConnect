package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Omogućava pristup bazi i pravljenje operacija nad njom. U većini slučajeva nije potrebno imati zasebne implementacije jer spring prema ključnim riječima "findBy", "existsBy" u pozadini to obavi za nas.
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);
    Optional<User> findByEmailOrUserName(String email, String userName);
    Optional<User> findByUserId(Long userId);
    boolean existsByUserName(String userName);
    boolean existsByMobileNumber(String mobileNumber);
    boolean existsByEmail(String email);
}
