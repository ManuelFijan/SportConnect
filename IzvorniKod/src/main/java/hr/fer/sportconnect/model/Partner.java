package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;

import java.time.LocalDateTime;

public class Partner extends User {
    private Rank rank;
    private boolean isApproved;
    public Partner() {

    }

    public Partner(Rank rank, boolean isApproved) {
        this.rank = rank;
        this.isApproved = isApproved;
    }

    public Partner(Long userId, String email, String passwordHash, String firstName, String lastName, String userName, UserType userType, LocalDateTime dateJoined, boolean isBanned, SubscriptionPlan subscriptionPlan, String mobileNumber, Rank rank, boolean isApproved, String profilePicture) {
        super(userId, email, passwordHash, firstName, lastName, userName, userType, dateJoined, isBanned, subscriptionPlan, mobileNumber, profilePicture);
        this.rank = rank;
        this.isApproved = isApproved;
    }
}
