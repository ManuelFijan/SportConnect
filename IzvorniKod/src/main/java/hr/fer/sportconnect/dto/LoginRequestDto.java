package hr.fer.sportconnect.dto;

import jakarta.validation.constraints.NotNull;

/**
 * DTO klasa koja predstavlja podatke potrebne za prijavu korisnika.
 * identifier je korisničko ime ili email.
 */

public class LoginRequestDto {
    @NotNull(message = "Email or username is required")
    private String identifier;
    @NotNull(message = "Password is required")
    private String password;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
