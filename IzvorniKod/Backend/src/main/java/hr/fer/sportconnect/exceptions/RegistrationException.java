package hr.fer.sportconnect.exceptions;

import java.util.Map;

/**
 * Iznimka koja se koristi za označavanje pogrešaka prilikom registracije novog korisnika.
 */

public class RegistrationException extends RuntimeException {
    private final Map<String, String> errors;

    public RegistrationException(Map<String, String> errors) {
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
