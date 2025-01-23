package hr.fer.sportconnect;

import hr.fer.sportconnect.dto.UserDto;
import hr.fer.sportconnect.dto.UserRegistrationDto;
import hr.fer.sportconnect.enums.SubscriptionPlan;
import hr.fer.sportconnect.enums.UserType;
import hr.fer.sportconnect.mappers.UserMapper;
import hr.fer.sportconnect.model.Client;
import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.ClientRepository;
import hr.fer.sportconnect.repository.UserRepository;
import hr.fer.sportconnect.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    ClientRepository clientRepository;

    @Mock
    UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void registerUser() {
        // primjer user-a
        String email = "ana@mail.com";
        String password = "password";
        String firstName = "Ana";
        String lastName = "Horvat";
        String username = "anahorvat";
        UserType userType = UserType.CLIENT;
        SubscriptionPlan subscriptionPlan = SubscriptionPlan.FREE;
        String mobileNumber = "+385 954123658";

        // oponasanje funkcija
        // registrirani korisnik jos ne postoji
        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(userRepository.existsByUserName(username)).thenReturn(false);
        when(userRepository.existsByMobileNumber(mobileNumber)).thenReturn(false);
        // kodiranje lozinke
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        UserDto userDto = new UserDto();
        userDto.setEmail(email);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setUserName(username);
        userDto.setUserType(userType);
        userDto.setSubscriptionPlan(subscriptionPlan);
        userDto.setMobileNumber(mobileNumber);

        // oponasanje user mapper-a
        when(userMapper.toDto(any(User.class))).thenReturn(userDto);

        Client client = new Client(
                email,
                password,
                firstName,
                lastName,
                username,
                subscriptionPlan,
                mobileNumber,
                null
        );

        // oponasanje client repository-a
        when(clientRepository.save(any(Client.class))).thenReturn(client);

        UserRegistrationDto userRegistrationDto = new UserRegistrationDto();
        userRegistrationDto.setEmail(email);
        userRegistrationDto.setPassword(password);
        userRegistrationDto.setFirstName(firstName);
        userRegistrationDto.setLastName(lastName);
        userRegistrationDto.setUserName(username);
        userRegistrationDto.setUserType(userType);
        userRegistrationDto.setSubscriptionPlan(subscriptionPlan);
        userRegistrationDto.setMobileNumber(mobileNumber);

        // registriranje korisnika
        UserDto result = userService.registerUser(userRegistrationDto);

        // provjera postojanja stvorenog user-a
        assertNotNull(result);
        // provjera atributa stvorenog user-a
        assertEquals(email, result.getEmail());
        assertEquals(firstName, result.getFirstName());
        assertEquals(lastName, result.getLastName());
        assertEquals(username, result.getUserName());
        assertEquals(userType, result.getUserType());
        assertEquals(subscriptionPlan, result.getSubscriptionPlan());
        assertEquals(mobileNumber, result.getMobileNumber());

        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, times(1)).existsByUserName(username);
        verify(userRepository, times(1)).existsByMobileNumber(mobileNumber);
        verify(clientRepository, times(1)).save(any(Client.class));
    }
}
