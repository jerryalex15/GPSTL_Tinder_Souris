package com.gpstl.alternart.Services;

import com.gpstl.alternart.Repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
// todo : Adapter ça à notre user model
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void createUser(SignupRequest signupRequest) {
//        if (userRepository.findByUsername(signupRequest.getUsername()) != null) {
//            throw new RuntimeException("Username already exists");
//        }
//        if (userRepository.findByEmail(signupRequest.getEmail()) != null) {
//            throw new RuntimeException("Email already exists");
//        }
//
//        User user = new User();
//        user.setUsername(signupRequest.getUsername());
//        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//        user.setEmail(signupRequest.getEmail());
//        user.setRole(UserRole.USER); // Default role
//        user.setLevel(1); // Initial level
//        user.setMangaFavorites(List.of()); // Initialize as empty list
//
//        userRepository.save(user);
//    }
//
//
//    public void login(SignInRequest signInRequest) {
//        User user = userRepository.findByUsername(signInRequest.getUsername());
//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }
//        if (!passwordEncoder.matches(signInRequest.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid password");
//        }
//    }
}
