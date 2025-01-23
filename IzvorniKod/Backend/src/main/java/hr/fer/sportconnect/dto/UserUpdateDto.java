package hr.fer.sportconnect.dto;

import hr.fer.sportconnect.enums.SubscriptionPlan;

/**
 * DTO klasa koja sadrži podatke potrebne za ažuriranje postojećeg korisnika.
 */

public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String userName;
    private String mobileNumber;

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

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
