package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.UserType;

import java.time.LocalDateTime;

public class Partner extends User {
    private Rank rank;
    private boolean isApproved;
    public Partner() {

    }

    public Partner(Long userId, String email, String passwordHash, String userName, LocalDateTime dateJoined, boolean isBanned, Rank rank, boolean isApproved) {
        super(userId, email, passwordHash, userName, UserType.PARTNER, dateJoined, isBanned);
        this.rank = rank;
        this.isApproved = isApproved;
    }
}
