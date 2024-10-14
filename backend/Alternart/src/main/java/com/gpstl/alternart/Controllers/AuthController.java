package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.SignInRequest;
import com.gpstl.alternart.Dto.SignupRequest;
import com.gpstl.alternart.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @GetMapping("/test")
    public ResponseEntity<String> testlink() {
        return ResponseEntity.ok("Test");
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignupRequest signupRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long userId = userService.createUser(signupRequest);
            response.put("userId", userId);
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody SignInRequest signInRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            Long userId = userService.login(signInRequest);
            response.put("userId", userId);
            response.put("message", "User logged successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
