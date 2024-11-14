package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import jakarta.persistence.*;

/**
 * Entitet koji predstavlja klijenta u sustavu.
 */

@Entity
@Table(name = "client")
@PrimaryKeyJoinColumn(name = "user_id") // This ensures that user_id is both PK and FK
public class Client extends User {

    // Default constructor
    public Client() {
        super();
        this.setUserType(UserType.CLIENT);
    }

    // Parameterized constructor (excluding userId as it's inherited and auto-generated)
    public Client(String email, String passwordHash, String firstName, String lastName, String userName,
                  SubscriptionPlan subscriptionPlan, String mobileNumber, String profilePicture) {
        super(email, passwordHash, firstName, lastName, userName, UserType.CLIENT, subscriptionPlan, mobileNumber, profilePicture);
    }
}
