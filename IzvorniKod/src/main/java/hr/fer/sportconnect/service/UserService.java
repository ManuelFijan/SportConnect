package hr.fer.sportconnect.service;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.dto.UserUpdateDto;
import java.util.Optional;

public interface UserService {
    UserDto registerUser(UserRegistrationDto registrationDto);
    Optional<UserDto> findByEmailOrUserName(String email, String userName);
    UserDto updateUser(String email, UserUpdateDto updateDto);
}