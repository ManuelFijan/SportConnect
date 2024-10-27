package hr.fer.sportconnect.dto;

public class LoginResponseDto {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserDto user;

    public LoginResponseDto(String accessToken, UserDto user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
