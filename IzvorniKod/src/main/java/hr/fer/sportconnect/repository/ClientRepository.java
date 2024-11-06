package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Client;
import hr.fer.sportconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
