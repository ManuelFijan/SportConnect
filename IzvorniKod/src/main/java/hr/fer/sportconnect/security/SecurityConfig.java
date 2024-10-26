package hr.fer.sportconnect.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/","/login/oauth2/code/**", "/error").permitAll()  // Allow access to the callback endpoints and error page
                        .anyRequest().authenticated()  // Require authentication for all other requests
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/users/signedin")  // Redirect URL after successful login
                        .failureUrl("/login?error=true")  // Redirect URL for login failure
                );

        return http.build();
    }
}
