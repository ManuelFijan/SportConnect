package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.UserType;

import java.time.LocalDateTime;

public class Admin extends User {
    public Admin() {
    }

    public Admin(Long userId, String email, String passwordHash, String userName, LocalDateTime dateJoined, boolean isBanned) {
        super(userId, email, passwordHash, userName, UserType.ADMIN, dateJoined, isBanned);
    }
}
