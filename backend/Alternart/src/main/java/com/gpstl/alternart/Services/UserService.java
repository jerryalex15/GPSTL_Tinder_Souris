package com.gpstl.alternart.Services;

import com.gpstl.alternart.Dto.CompanyDTO;
import com.gpstl.alternart.Dto.SignInRequest;
import com.gpstl.alternart.Dto.SignupRequest;
import com.gpstl.alternart.Dto.StudentDTO;
import com.gpstl.alternart.Models.User;
import com.gpstl.alternart.Repositories.CategoryRepository;
import com.gpstl.alternart.Repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.List;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Long createUser(SignupRequest signupRequest) {
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
        user = userRepository.save(user);
        if (Objects.equals(user.getRole(), "student")) {
            StudentDTO studentDTO = new StudentDTO();
            studentDTO.setUserId(user.getId());
            studentDTO.setKeySkills("");
            studentDTO.setCvLink(null);
            studentDTO.setCategoryIds(List.of());
            studentDTO.setVideoPresentationLink("");
            studentDTO.setPortfolioLink("");
            studentService.createStudent(studentDTO);
        }
        if (Objects.equals(user.getRole(), "company")) {
            CompanyDTO companyDTO = new CompanyDTO();
            companyDTO.setUserId(user.getId());
            companyDTO.setCompanyName("");
            companyDTO.setPhoto(null);
            companyDTO.setDescription("");
            companyDTO.setPerks("");
            companyService.createCompany(companyDTO);
        }

        return user.getId();
    }


    public Long login(SignInRequest signInRequest) {
        Optional<User> user = userRepository.findByUsername(signInRequest.getUsername());
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        // user exists
        if (!passwordEncoder.matches(signInRequest.getPassword(), user.get().getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return user.get().getId();
    }

    public Optional<Long> getIdOfUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::getId);
    }

    public Optional<String> getRoleOfUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(User::getRole);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
}
