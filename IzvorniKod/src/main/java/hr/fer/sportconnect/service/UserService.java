package hr.fer.sportconnect.service;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;

import java.util.Optional;

public interface UserService {
    UserDto registerUser(UserRegistrationDto registrationDto);
    Optional<UserDto> findByEmailOrUserName(String email, String userName);
}
