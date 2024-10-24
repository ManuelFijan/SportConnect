package hr.fer.sportconnect.mappers;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userName", source = "userName")
    User toEntity(UserRegistrationDto userRegistrationDto);
    UserDto toDto(User user);
}
