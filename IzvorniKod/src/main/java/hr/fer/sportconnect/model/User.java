package hr.fer.sportconnect.model;

import hr.fer.sportconnect.enums.UserType;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(unique = true, nullable = false)
    private String email;
    private String passwordHash;
    @Column(nullable = false)
    private String userName;
    private UserType userType;
    @Column(nullable = false)
    private LocalDateTime dateJoined = LocalDateTime.now();
    private boolean isBanned = false;

    public User() {

    }

    public User(Long userId, String email, String passwordHash, String userName, UserType userType, LocalDateTime dateJoined, boolean isBanned) {
        this.userId = userId;
        this.email = email;
        this.passwordHash = passwordHash;
        this.userName = userName;
        this.userType = userType;
        this.dateJoined = dateJoined;
        this.isBanned = isBanned;
    }

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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
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

    public LocalDateTime getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(LocalDateTime dateJoined) {
        this.dateJoined = dateJoined;
    }

    public boolean isBanned() {
        return isBanned;
    }

    public void setBanned(boolean banned) {
        isBanned = banned;
    }
}
