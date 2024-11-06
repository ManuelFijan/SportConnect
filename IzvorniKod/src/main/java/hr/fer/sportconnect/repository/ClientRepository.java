package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
