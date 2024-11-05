package hr.fer.sportconnect.controller;

import hr.fer.sportconnect.dto.*;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.exceptions.UpdateUserInfoException;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.security.JwtTokenProvider;
import hr.fer.sportconnect.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import org.hibernate.sql.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // change because: Allow requests from React app
public class UserController {

    private final UserServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserController(UserServiceImpl userService, AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, UserRepository userRepository, UserMapper userMapper) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("/signedin")
    public Map<String, Object> user(OAuth2AuthenticationToken authenticationToken,
                                    @AuthenticationPrincipal OAuth2User principal) {
        // Get provider (registration ID) such as "google" or "github"
        String provider = authenticationToken.getAuthorizedClientRegistrationId();

        Map<String, Object> response = new HashMap<>();

        if ("google".equals(provider)) {
            response.put("firstName", principal.getAttribute("given_name"));
            response.put("lastName", principal.getAttribute("family_name") != null ? principal.getAttribute("family_name") : " ");
            response.put("email", principal.getAttribute("email"));
            response.put("profilePicture", principal.getAttribute("picture"));
        } else if ("facebook".equals(provider)) {
            response.put("email", principal.getAttribute("email"));

            String fullName = principal.getAttribute("name");

            if (fullName != null) {
                String[] nameParts = fullName.split(" ", 2);
                String firstName = nameParts[0];
                String lastName = nameParts.length > 1 ? nameParts[1] : " ";

                response.put("firstName", firstName);
                response.put("lastName", lastName);
            }
        }

        response.put("provider", provider); // "google" or "facebook"

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getIdentifier(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);

            UserDto userDto = userService.findByEmailOrUserName(loginRequest.getIdentifier(), loginRequest.getIdentifier())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return ResponseEntity.ok(new LoginResponseDto(token, userDto));
        } catch (AuthenticationException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username/email or password is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
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

}