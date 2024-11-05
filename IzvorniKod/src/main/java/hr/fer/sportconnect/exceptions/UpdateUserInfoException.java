package hr.fer.sportconnect.exceptions;

import java.util.Map;

public class UpdateUserInfoException extends RuntimeException {
    private final Map<String, String> errors;

    public UpdateUserInfoException(Map<String, String> errors) {
        this.errors = errors;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
