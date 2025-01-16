package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.db.SupabaseS3Service;
import hr.fer.sportconnect.dto.*;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.exceptions.LoginException;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.exceptions.UpdateUserInfoException;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.Client;
import hr.fer.sportconnect.model.Partner;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ClientRepository;
import hr.fer.sportconnect.repository.PartnerRepository;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.security.JwtTokenProvider;
import hr.fer.sportconnect.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Implementacija koja definira osnovne metode za upravljanje korisnicima.
 * Ovdje se nalazi sva poslovna logika vezana za prijavu, registraciju, ažuriranje i dohvat korisničkih informacija.
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PartnerRepository partnerRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final SupabaseS3Service supabaseS3Service;
    public UserServiceImpl(UserRepository userRepository, ClientRepository clientRepository, PartnerRepository partnerRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenProvider tokenProvider, SupabaseS3Service supabaseS3Service) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.partnerRepository = partnerRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.supabaseS3Service = supabaseS3Service;
    }

    public UserDto registerUser(UserRegistrationDto registrationDto) {
        Map<String, String> errors = new HashMap<>();

        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            errors.put("emailError", "Email is already in use");
        }

        if (userRepository.existsByUserName(registrationDto.getUserName())) {
            errors.put("userNameError", "Username is already in use");
        }

        if(userRepository.existsByMobileNumber(registrationDto.getMobileNumber())) {
            errors.put("phoneNumberError", "Phone number is already in use");
        }

        if (!errors.isEmpty()) {
            throw new RegistrationException(errors);
        }

        String encodedPassword = passwordEncoder.encode(registrationDto.getPassword());

        User savedUser = null;

        // Determine user type and create appropriate subclass instance
        if (registrationDto.getUserType() == UserType.CLIENT) {
            Client client = new Client(
                    registrationDto.getEmail(),
                    encodedPassword,
                    registrationDto.getFirstName(),
                    registrationDto.getLastName(),
                    registrationDto.getUserName(),
                    registrationDto.getSubscriptionPlan(),
                    registrationDto.getMobileNumber(),
                    registrationDto.getProfilePicture()
            );
            savedUser = clientRepository.save(client);
        } else if (registrationDto.getUserType() == UserType.PARTNER) {
            Partner partner = new Partner(
                    registrationDto.getEmail(),
                    encodedPassword,
                    registrationDto.getFirstName(),
                    registrationDto.getLastName(),
                    registrationDto.getUserName(),
                    registrationDto.getSubscriptionPlan(),
                    registrationDto.getMobileNumber(),
                    registrationDto.getProfilePicture()
            );
            savedUser = partnerRepository.save(partner);
        } else {
            throw new RegistrationException(Map.of("userTypeError", "Invalid user type"));
        }

        //System.out.println("Raw password: " + registrationDto.getPassword());
        //System.out.println("Encoded password: " + savedUser.getPasswordHash());

        return userMapper.toDto(savedUser);
    }

    @Override
    public Optional<UserDto> findByEmailOrUserName(String email, String userName) {
        return userRepository.findByEmailOrUserName(email, userName).map(userMapper::toDto);
    }

    public UserDto updateUser(String email, UserUpdateDto updateDto) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Map<String, String> errors = new HashMap<>();

        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        User user = optionalUser.get();

        /*if (userRepository.existsByFirstName(updateDto.getFirstName()) && !(user.getFirstName().equals(updateDto.getFirstName()))) {
            errors.put("firstNameError", "First name is already in use");
        }

        if (userRepository.existsByLastName(updateDto.getLastName()) && !(user.getLastName().equals(updateDto.getLastName()))) {
            errors.put("lastNameError", "Last name is already in use");
        }*/

        if (userRepository.existsByUserName(updateDto.getUserName()) && !(user.getUserName().equals(updateDto.getUserName()))) {
            errors.put("userNameError", "Username is already in use");
        }

        if(userRepository.existsByMobileNumber(updateDto.getMobileNumber()) && !(user.getMobileNumber().equals(updateDto.getMobileNumber()))) {
            errors.put("phoneNumberError", "Phone number is already in use");
        }

        if (!errors.isEmpty()) {
            throw new UpdateUserInfoException(errors);
        }

        //User user = optionalUser.get();

        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());
        user.setUserName(updateDto.getUserName());
        user.setMobileNumber(updateDto.getMobileNumber());

        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public UserDto updateSubscriptionPlan(String email, SubscriptionPlan newSubscriptionPlan) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        User user = optionalUser.get();

        user.setSubscriptionPlan(newSubscriptionPlan);
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return userMapper.toDto(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public LoginResponseDto login(LoginRequestDto loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getIdentifier(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);

            UserDto userDto = findByEmailOrUserName(loginRequest.getIdentifier(), loginRequest.getIdentifier())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return new LoginResponseDto(token, userDto);
        } catch (AuthenticationException ex) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Username/email or password is invalid");
            throw new LoginException(error);
        }
    }

    @Override
    public Map<String, Object> getSignedInUser(OAuth2AuthenticationToken authenticationToken, OAuth2User principal) {
        // Get provider (registration ID) such as "google" or "GitHub"
        String provider = authenticationToken.getAuthorizedClientRegistrationId();

        Map<String, Object> response = new HashMap<>();

        if ("google".equals(provider)) {
            response.put("firstName", principal.getAttribute("given_name"));
            response.put("lastName", principal.getAttribute("family_name") != null ? principal.getAttribute("family_name") : " ");
            response.put("email", principal.getAttribute("email"));
            response.put("profilePicture", principal.getAttribute("picture"));
        }  else if ("github".equals(provider)) {
            String fullName = principal.getAttribute("name");
            if (fullName != null && !fullName.isEmpty()) {
                String[] nameParts = fullName.split(" ", 2); // Split into at most 2 parts
                String firstName = nameParts[0]; // First part is the first name
                String lastName = nameParts.length > 1 ? nameParts[1] : ""; // Second part (if available) is the last name

                response.put("firstName", firstName);
                response.put("lastName", lastName);
            }
            response.put("email", principal.getAttribute("email"));
            response.put("userName", principal.getAttribute("login"));
            response.put("profilePicture", principal.getAttribute("avatar_url"));
        }

        response.put("provider", provider); // "google" or "GitHub"

        return response;
    }

    @Override
    public List<User> searchUsersByEmail(String email) {
        return userRepository.findByEmailStartingWithIgnoreCase(email);
    }

    @Override
    public List<User> searchUsersByUsername(String username) {
        return userRepository.findByUserNameContainingIgnoreCase(username);
    }

    @Override
    public List<User> searchUsers(String query) {
        List<User> users = userRepository.findByEmailContainingIgnoreCaseOrUserNameContainingIgnoreCase(query, query);
        return users;
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto banUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        User user = optionalUser.get();

        user.setBanned(true);
        userRepository.save(user);

        return userMapper.toDto(user);
    }

    public UserDto updateProfilePicture(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("No file provided or file is empty.");
        }

        try {
            // Generate a unique filename
            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID().toString()
                    + (originalFilename != null ? "-" + originalFilename : "");

            // Save the file to a temporary location
            File tempFile = File.createTempFile("profilepic-", "-" + uniqueFilename);
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(file.getBytes());
            }

            // Upload the file to Supabase bucket
            String bucketName = "profilne";
            supabaseS3Service.uploadFile(bucketName, uniqueFilename, tempFile.getAbsolutePath());

            // Construct the public URL
            String newProfilePicUrl = "https://pccmxztqfmfucdbgcydr.supabase.co/storage/v1/object/public/"
                    + bucketName + "/" + uniqueFilename;

            // Clean up temp file
            tempFile.delete();

            // Save the URL to the user record
            user.setProfilePicture(newProfilePicUrl);
            userRepository.save(user);

            return userMapper.toDto(user);

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload new profile picture.", e);
        }
    }
}
