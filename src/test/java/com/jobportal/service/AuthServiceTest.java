package com.jobportal.service;

import com.jobportal.dto.RegisterRequest;
import com.jobportal.entity.Role;
import com.jobportal.entity.User;
import com.jobportal.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterUser() {

        RegisterRequest request =
                new RegisterRequest();

        request.setName("Test User");
        request.setEmail("test@gmail.com");
        request.setPassword("123456");
        request.setRole(Role.CANDIDATE);

        when(passwordEncoder.encode("123456"))
                .thenReturn("encodedPassword");

        authService.register(request);

        verify(userRepository)
                .save(any(User.class));
    }
}