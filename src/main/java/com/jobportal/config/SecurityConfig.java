package com.jobportal.config;

import com.jobportal.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;


    @Bean
    SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS))

                .authenticationProvider(
                        authenticationProvider)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)

                .authorizeHttpRequests(auth -> auth



                        .requestMatchers(
                                "/api/auth/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html")
                        .permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/api/jobs/**")
                        .permitAll()

                        .requestMatchers(HttpMethod.POST,
                                "/api/jobs/**")
                        .hasAnyRole("RECRUITER","ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/jobs/**")
                        .hasAnyRole("RECRUITER","ADMIN")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/jobs/**")
                        .hasRole("ADMIN")

                        .requestMatchers("/api/applications/apply")
                        .hasRole(
                                "CANDIDATE")

                        .requestMatchers("/api/applications/**")
                        .hasAnyRole(
                                "RECRUITER",
                                "ADMIN","CANDIDATE")

                        .anyRequest()
                        .authenticated()
                );

        return http.build();
    }
}