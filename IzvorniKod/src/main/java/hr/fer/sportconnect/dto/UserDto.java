package hr.fer.sportconnect.dto;

import hr.fer.sportconnect.enums.UserType;

/**
 * Zadužen za prijenos podataka korisnika između servisnog sloja i modela. Navodimo samo one atribute koje želimo da se šalju "vanjskom" svijetu.
 */

public class UserDto {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String userName;
    private UserType userType;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}
