package hr.fer.sportconnect.mappers;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "dateJoined", ignore = true)
    @Mapping(target = "banned", ignore = true)
    @Mapping(target = "userId", ignore = true)
    User toEntity(UserRegistrationDto userRegistrationDto);
    UserDto toDto(User user);
}
