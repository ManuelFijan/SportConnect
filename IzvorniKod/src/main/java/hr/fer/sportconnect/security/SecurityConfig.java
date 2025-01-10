// src/main/java/hr/fer/sportconnect/security/SecurityConfig.java

package hr.fer.sportconnect.security;

import hr.fer.sportconnect.service.impl.CustomUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtTokenProvider tokenProvider;
    private final CustomUserDetailsServiceImpl userDetailsService;
    private final CorsConfigurationSource corsConfigurationSource;

    @Autowired
    public SecurityConfig(JwtTokenProvider tokenProvider,
                          CustomUserDetailsServiceImpl userDetailsService,
                          CorsConfigurationSource corsConfigurationSource) {
        this.tokenProvider = tokenProvider;
        this.userDetailsService = userDetailsService;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(tokenProvider, userDetailsService);
    }

    @Bean
    @Order(1)
    public SecurityFilterChain apiSecurityFilterChain(HttpSecurity http) throws Exception {
        // Define a combined matcher for /api/**, /chat/**, and /pusher/**
        OrRequestMatcher matcher = new OrRequestMatcher(
                new AntPathRequestMatcher("/api/**"),
                new AntPathRequestMatcher("/chat/**"),
                new AntPathRequestMatcher("/pusher/**"),
                new AntPathRequestMatcher("/checkout/**"),
                new AntPathRequestMatcher("/users/search")
        );

        http
                .securityMatcher(matcher)
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        //.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow OPTIONS globally
                        .requestMatchers("/api/users/register", "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/checkout/hosted").permitAll()
                        // Allow OPTIONS requests globally
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    @Order(2)
    public SecurityFilterChain webSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(
                                "/users/register", "/users/login", "/users/update",
                                "/users/get-information/**", "/users/signedin",
                                "/posts/create", "/posts/*/like", "/posts/*/comment",
                                "/posts/*/save", "/posts/saved", "/posts/*/comments",
                                "/posts", "/posts/user", "/posts/user/**", "/posts/comment/**",
                                "/posts/**", "/chat/unread-counts/**", "/users/all",
                                "/stripe-webhooks/events", "/chat/conversations/**", "/chat/conversations/*/read"
                        )
                )
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/", "/login", "/login/oauth2/code/**", "/error",
                                "/users/register", "/users/login", "/users/update",
                                "/users/get-information/**", "/users/test",
                                "/posts/create", "/posts/*/like", "/posts/*/comment",
                                "/posts/*/save", "/posts/saved", "/posts/*/comments",
                                "/posts", "/posts/user", "/posts/user/**", "/posts/comment/**",
                                "/posts/**", "/chat/unread-counts/**", "/users/all",
                                "/stripe-webhooks/events", "/chat/conversations/**", "/chat/conversations/*/read"
                        ).permitAll()
                        //.requestMatchers("/chat/**", "/pusher/**").authenticated()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login")
                        .defaultSuccessUrl("/users/signedin")
                        .failureUrl("/login?error=true")
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:3000/set-up-your-account")
                        .failureUrl("http://localhost:3000")
                );

        return http.build();
    }
}