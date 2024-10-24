package hr.fer.sportconnect.service;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;

public interface UserService {
    UserDto registerUser(UserRegistrationDto registrationDto);
}
