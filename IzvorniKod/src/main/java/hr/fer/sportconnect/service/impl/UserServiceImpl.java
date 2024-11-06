package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.dto.UserUpdateDto;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.exceptions.UpdateUserInfoException;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.Client;
import hr.fer.sportconnect.model.Partner;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ClientRepository;
import hr.fer.sportconnect.repository.PartnerRepository;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.UserService;
import jakarta.servlet.http.Part;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Logika vezana uz registraciju korisnika
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final PartnerRepository partnerRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, ClientRepository clientRepository, PartnerRepository partnerRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.partnerRepository = partnerRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
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

        if (userRepository.existsByUserName(updateDto.getUserName())) {
            errors.put("userNameError", "Username is already in use");
        }

        if(userRepository.existsByMobileNumber(updateDto.getMobileNumber())) {
            errors.put("phoneNumberError", "Phone number is already in use");
        }

        if (!errors.isEmpty()) {
            throw new UpdateUserInfoException(errors);
        }

        User user = optionalUser.get();

        if (updateDto.getFirstName() != null) {
            user.setFirstName(updateDto.getFirstName());
        }
        if (updateDto.getLastName() != null) {
            user.setLastName(updateDto.getLastName());
        }
        if (updateDto.getUserName() != null) {
            user.setUserName(updateDto.getUserName());
        }
        if (updateDto.getMobileNumber() != null) {
            user.setMobileNumber(updateDto.getMobileNumber());
        }
        if (updateDto.getSubscriptionPlan() != null) {
            user.setSubscriptionPlan(updateDto.getSubscriptionPlan());
        }

        userRepository.save(user);

        return userMapper.toDto(user);
    }

}
