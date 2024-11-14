package hr.fer.sportconnect.exceptions;

import java.util.Map;

/**
 * Iznimka koja se koristi za označavanje pogrešaka prilikom prijave postojećeg korisnika.
 */

public class LoginException extends RuntimeException {
    private final Map<String, String> errors;

    public LoginException(Map<String, String> errors) {
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
