package com.jobportal.config;

import com.jobportal.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final AuthenticationProvider authenticationProvider;


    // =========================
    // CORS
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }


    // =========================
    // SECURITY
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // CORS
                .cors(cors -> {})

                // Disable CSRF because we are using JWT
                .csrf(csrf -> csrf.disable())


                // JWT = Stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // Authentication provider
                .authenticationProvider(
                        authenticationProvider
                )


                // JWT filter
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )


                // Authorization
                .authorizeHttpRequests(auth -> auth


                        // =========================
                        // PUBLIC AUTH APIs
                        // =========================

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()


                        // =========================
                        // PUBLIC SWAGGER
                        // =========================

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**"
                        ).permitAll()


                        // =========================
                        // PUBLIC JOB GET APIs
                        // =========================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/jobs",
                                "/api/jobs/**"
                        ).permitAll()


                        // =========================
                        // JOB CREATE
                        // =========================

                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/jobs",
                                "/api/jobs/**"
                        ).hasAnyRole(
                                "RECRUITER",
                                "ADMIN"
                        )


                        // =========================
                        // JOB UPDATE
                        // =========================

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/jobs",
                                "/api/jobs/**"
                        ).hasAnyRole(
                                "RECRUITER",
                                "ADMIN"
                        )


                        // =========================
                        // JOB DELETE
                        // =========================

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/jobs",
                                "/api/jobs/**"
                        ).hasAnyRole("RECRUITER","ADMIN")


                        // =========================
                        // RESUME
                        // =========================

                        .requestMatchers(
                                "/api/resume/**"
                        ).permitAll()


                        // =========================
                        // ATS
                        // =========================

                        .requestMatchers(
                                "/api/ats/**"
                        ).permitAll()


                        // =========================
                        // RECOMMENDATION
                        // =========================

                        .requestMatchers(
                                "/api/recommend/**"
                        ).permitAll()


                        // =========================
                        // APPLICATIONS
                        // =========================

                        .requestMatchers(
                                "/api/applications/apply"
                        ).permitAll()

                        .requestMatchers(
                                "/api/applications/**"
                        ).hasAnyRole(
                                "RECRUITER",
                                "ADMIN",
                                "CANDIDATE"
                        )


                        // =========================
                        // OPTIONS / PREFLIGHT
                        // =========================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()


                        // =========================
                        // EVERYTHING ELSE
                        // =========================

                        .anyRequest()
                        .permitAll()
                );

        return http.build();
    }
}