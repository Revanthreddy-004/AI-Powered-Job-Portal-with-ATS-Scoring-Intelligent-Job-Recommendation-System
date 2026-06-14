package com.jobportal.service;
import com.jobportal.dto.AuthResponse;
import com.jobportal.dto.LoginRequest;
import com.jobportal.dto.RegisterRequest;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        System.out.println(
                "EMAIL = " +
                        request.getEmail());

        System.out.println(
                "RAW PASSWORD = " +
                        request.getPassword());

        System.out.println(
                "DB HASH = " +
                        user.getPassword());

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        System.out.println(
                "MATCHES = " +
                        matches);

        if (!matches) {
            throw new RuntimeException(
                    "Invalid Credentials");
        }

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .role(user.getRole().name())
                .build();
}
}