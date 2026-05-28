package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.UserRepository;
import com.smarthealthcare.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;
  private final UserRepository users;

  @PostMapping("/register")
  public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
    return ApiResponse.ok("Registered", authService.register(request));
  }

  @PostMapping("/login")
  public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    return ApiResponse.ok(authService.login(request));
  }

  @GetMapping("/me")
  public ApiResponse<UserResponse> me(Authentication authentication) {
    return ApiResponse.ok(EntityMapper.user(users.findByEmail(authentication.getName()).orElseThrow()));
  }
}
