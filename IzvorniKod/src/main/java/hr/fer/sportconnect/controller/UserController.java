package hr.fer.sportconnect.controller;

import hr.fer.sportconnect.dto.*;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.exceptions.LoginException;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.exceptions.UpdateUserInfoException;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            List<User> users = userService.searchUsersByEmail(query);
            return ResponseEntity.ok(users);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error searching users.");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<UserDto> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching users.");
        }
    }

    /**
     * Update the user's profile picture
     */
    @PostMapping(value = "/update-profile-picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProfilePicture(
            @RequestParam("email") String email,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            UserDto updatedUser = userService.updateProfilePicture(email, file);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update profile picture.");
        }
    }

    @PostMapping("/update-rank")
    public ResponseEntity<?> updateRank(@Valid @RequestBody updateSubscriptionDTO subscriptionDto) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            String currentUserEmail = authentication.getName();
            if (userService.getUserByEmail(currentUserEmail).getUserType()== UserType.ADMIN) {
                UserDto updatedUser = userService.updateSubscriptionPlan(subscriptionDto.getEmail(), SubscriptionPlan.valueOf(subscriptionDto.getSubscriptionPlan().toUpperCase()));
                return ResponseEntity.ok(updatedUser);
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Not an admin");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/ban")
    public ResponseEntity<?> banUser(@RequestParam("email") String email) {
        try {
            UserDto updatedUser = userService.banUser(email);
            return ResponseEntity.ok(updatedUser);
        } catch (UpdateUserInfoException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getErrors());
        }
    }
}