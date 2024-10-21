package com.gpstl.alternart.Controllers;

import com.gpstl.alternart.Dto.SignInRequest;
import com.gpstl.alternart.Dto.SignupRequest;
import com.gpstl.alternart.Services.UserService;
import com.gpstl.alternart.Utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

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
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            signInRequest.getUsername(),
                            signInRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication.getName());

            response.put("token", jwt);
            response.put("message", "User logged in successfully");
            // also return the user id
            Optional<Long> userId = userService.getIdOfUser(signInRequest.getUsername());
            userId.ifPresentOrElse(id -> response.put("userId", id), () -> response.put("error", "User not found"));
            // send the role of the user
            response.put("role", authentication.getAuthorities().toArray()[0].toString());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            response.put("error", "Invalid username or password");
            return ResponseEntity.status(401).body(response);
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
