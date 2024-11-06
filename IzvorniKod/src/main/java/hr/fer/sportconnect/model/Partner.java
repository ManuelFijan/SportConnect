package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import jakarta.persistence.*;

@Entity
@Table(name = "partner")
@PrimaryKeyJoinColumn(name = "user_id") // This ensures that user_id is both PK and FK
public class Partner extends User {
    @Column(nullable = false)
    private String rank;
    @Column(nullable = false)
    private boolean approved;
    @Column(nullable = false)
    private String bio;

    public Partner() {
        super();
        this.setUserType(UserType.PARTNER);
    }

    public Partner(String email, String passwordHash, String firstName, String lastName, String userName,
                  SubscriptionPlan subscriptionPlan, String mobileNumber, String profilePicture) {
        super(email, passwordHash, firstName, lastName, userName, UserType.PARTNER, subscriptionPlan, mobileNumber, profilePicture);
        this.rank = "BRONZE";
        this.approved = false;
        this.bio = "BIO";
    }
}
