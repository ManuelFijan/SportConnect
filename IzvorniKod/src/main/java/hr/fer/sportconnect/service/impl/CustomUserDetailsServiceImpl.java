package hr.fer.sportconnect.service.impl;

import hr.fer.sportconnect.model.User;
import hr.fer.sportconnect.repository.UserRepository;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Implementacija servisa za dohvat korisničkih detalja koja se koristi za autentifikaciju korisnika.
 */

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByEmailOrUserName(identifier, identifier);
        if (userOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found with identifier: " + identifier);
        }
        User user = userOpt.get();

        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getUserType().name()));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                authorities
        );
    }
}
