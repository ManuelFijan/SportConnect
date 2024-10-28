package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        if (userRepository.existsByUserName(registrationDto.getUserName())) {
            throw new IllegalArgumentException("Username is already in use");
        }

        if(userRepository.existsByMobileNumber(registrationDto.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile phone is already in use");
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