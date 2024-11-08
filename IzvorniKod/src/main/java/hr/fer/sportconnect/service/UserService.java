package hr.fer.sportconnect.service;

import hr.fer.sportconnect.dto.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
}
