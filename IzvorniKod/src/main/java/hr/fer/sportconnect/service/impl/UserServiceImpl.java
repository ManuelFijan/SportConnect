package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDto registerUser(UserRegistrationDto registrationDto) {

        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = userMapper.toEntity(registrationDto);

        user.setPasswordHash(registrationDto.getPassword());
        user.setUserType(UserType.ADMIN);
        user.setDateJoined(LocalDateTime.now());
        user.setBanned(false);

        User savedUser = userRepository.save(user);

        return userMapper.toDto(savedUser);
    }
}
