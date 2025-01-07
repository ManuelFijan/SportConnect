package hr.fer.sportconnect.service;

import hr.fer.sportconnect.dto.*;
import hr.fer.sportconnect.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Sučelje koje definira osnovne metode za upravljanje korisnicima.
 */

public interface UserService {
    UserDto registerUser(UserRegistrationDto registrationDto);
    Optional<UserDto> findByEmailOrUserName(String email, String userName);
    UserDto updateUser(String email, UserUpdateDto updateDto);
    UserDto getUserByEmail(String email);
    LoginResponseDto login(LoginRequestDto loginRequest);
    Map<String, Object> getSignedInUser(OAuth2AuthenticationToken authenticationToken, OAuth2User principal);
    List<User> searchUsersByEmail(String email);
    List<User> searchUsersByUsername(String username);
    public List<User> searchUsers(String query);
    List<UserDto> getAllUsers();
}
