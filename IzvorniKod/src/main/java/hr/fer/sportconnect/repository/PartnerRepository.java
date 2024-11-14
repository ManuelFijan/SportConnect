package hr.fer.sportconnect.repository;

import hr.fer.sportconnect.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repozitorij za pristup podacima o partnerima u bazi podataka.
 * Nasljeđuje JpaRepository za osnovne operacije nad entitetom Partner.
 * Metoda save (kao i mnoge druge) je podržana automatski od Springa te ju stoga nije potrebno eksplicitno napisati.
 */

public interface PartnerRepository extends JpaRepository<Partner, Long> {
}
