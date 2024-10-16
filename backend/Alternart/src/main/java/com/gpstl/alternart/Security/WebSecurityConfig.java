package com.gpstl.alternart.Security;

import com.gpstl.alternart.Services.UserDetailsServiceImpl;
import com.gpstl.alternart.config.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// tous les chemins qui commencent sont pas autorisés à tout le monde,à part /auth/** qui est autorisé à tout le monde
@Configuration
@EnableMethodSecurity(prePostEnabled = true) // Updated annotation
public class WebSecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    // Updated AuthenticationManager bean definition
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


    // Updated SecurityFilterChain bean definition
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Disable CORS and CSRF using lambda syntax
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable())

                // Exception handling configuration
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint(unauthorizedHandler)
                )

                // Session management configuration
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // Authorization configuration using the new authorizeHttpRequests()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Updated matcher
                        .anyRequest().authenticated()
                );

        // Add JWT token filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
