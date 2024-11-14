package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repozitorij za pristup podacima o klijentima u bazi podataka.
 * Nasljeđuje JpaRepository za osnovne operacije nad entitetom Client.
 * Metoda save (kao i mnoge druge) je podržana automatski od Springa te ju stoga nije potrebno eksplicitno napisati.
 */

public interface ClientRepository extends JpaRepository<Client, Long> {
}
