package hr.fer.sportconnect.controller;

import hr.fer.sportconnect.dto.*;
import hr.fer.sportconnect.exceptions.LoginException;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.exceptions.UpdateUserInfoException;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Upravlja pozivima endpointova s frontenda.
 */

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000, https://sportconnect-8b7o.onrender.com", allowCredentials = "true") // change because: Allow requests from React app
public class UserController {

    private final UserServiceImpl userService;
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/signedin")
    public Map<String, Object> user(OAuth2AuthenticationToken authenticationToken,
                                    @AuthenticationPrincipal OAuth2User principal) {
        return userService.getSignedInUser(authenticationToken, principal);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        try {
            LoginResponseDto response = userService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (LoginException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getErrors());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto registrationDto) {
        try {
            UserDto userDto = userService.registerUser(registrationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
        } catch (RegistrationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getErrors());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestParam("email") String email, @RequestBody @Valid UserUpdateDto updateDto) {
        try {
            UserDto updatedUser = userService.updateUser(email, updateDto);
            return ResponseEntity.ok(updatedUser);
        } catch (UpdateUserInfoException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getErrors());
        }
    }

    @GetMapping("/get-information/{email}")
    public ResponseEntity<?> getUserInformation(@PathVariable String email) {
        try {
            UserDto userDto = userService.getUserByEmail(email);
            return ResponseEntity.ok(userDto);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("bok");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam("query") String query) {
        try {
            List<User> users = userService.searchUsers(query);
            return ResponseEntity.ok(users);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error searching users.");
        }
    }
}