package hr.fer.sportconnect.mappers;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * Zadužen za pretvorbu entiteta u njihove DTO oblike i obrnuto.
 * ComponentModel omogućuje da mapper bude moguće injektirati.
 * Mapping daje dodatnu kontrolu nad time kako će se podaci mapirati. U ovom slučaju se pojedini atributi ignoriraju.
 */


@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "dateJoined", ignore = true)
    @Mapping(target = "banned", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(source = "mobileNumber", target = "mobileNumber")
    @Mapping(source = "subscriptionPlan", target = "subscriptionPlan")
    User toEntity(UserRegistrationDto userRegistrationDto);
    UserDto toDto(User user);
}
