package com.jobportal.security;

import com.jobportal.service.CustomUserDetailsService;
import com.jobportal.service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    private final JwtService jwtService;

    private final CustomUserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        String path =
                request.getServletPath();


        // =====================================
        // PUBLIC ENDPOINTS
        // =====================================

        if (path.startsWith("/api/auth")
                || path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =====================================
        // GET JOBS DOES NOT REQUIRE JWT
        // =====================================

        if (request.getMethod().equals("GET")
                && path.startsWith("/api/jobs")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =====================================
        // GET TOKEN
        // =====================================

        String authHeader =
                request.getHeader("Authorization");


        // No token
        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        String jwt =
                authHeader.substring(7);


        try {

            String email =
                    jwtService.extractEmail(jwt);


            if (email != null
                    && SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    == null) {


                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);


                if (jwtService.isTokenValid(
                        jwt,
                        userDetails.getUsername())) {


                    UsernamePasswordAuthenticationToken
                            authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );


                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authenticationToken
                            );
                }
            }


        } catch (ExpiredJwtException e) {

            System.out.println(
                    "JWT TOKEN EXPIRED"
            );

        } catch (Exception e) {

            System.out.println(
                    "INVALID JWT TOKEN"
            );
        }


        filterChain.doFilter(
                request,
                response
        );
    }
}