package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.SignInRequest;
import com.gpstl.alternart.Dto.SignupRequest;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(SignupRequest signupRequest) {
        if (userRepository.findByUsername(signupRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setPasswordHash(passwordEncoder.encode(signupRequest.getPassword()));
        user.setEmail(signupRequest.getEmail());
        user.setRole(signupRequest.getRole()); // Default role

        userRepository.save(user);
    }


    public void login(SignInRequest signInRequest) {
        Optional<User> user = userRepository.findByUsername(signInRequest.getUsername());
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        // user exists
        if (!passwordEncoder.matches(signInRequest.getPassword(), user.get().getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }
    }
}
