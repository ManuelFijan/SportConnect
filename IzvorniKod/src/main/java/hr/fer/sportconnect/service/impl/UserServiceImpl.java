package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.exceptions.RegistrationException;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.UserService;
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
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
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

        User user = userMapper.toEntity(registrationDto);

        user.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
        user.setDateJoined(LocalDateTime.now());
        user.setBanned(false);

        User savedUser = userRepository.save(user);
        System.out.println("Raw password: " + registrationDto.getPassword());
        System.out.println("Encoded password: " + user.getPasswordHash());

        return userMapper.toDto(savedUser);
    }

    @Override
    public Optional<UserDto> findByEmailOrUserName(String email, String userName) {
        return userRepository.findByEmailOrUserName(email, userName).map(userMapper::toDto);
    }
}
