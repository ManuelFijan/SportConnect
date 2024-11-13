package hr.fer.sportconnect.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Omogućava CORS za sve rute
        registry.addMapping("/") // Za sve rute
                .allowedOrigins("https://sportconnect-8b7o.onrender.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*") // Dozvoljava sva zaglavlja
                .allowCredentials(true);
    }
}