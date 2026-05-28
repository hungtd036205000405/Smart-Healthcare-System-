package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.*;
import com.smarthealthcare.entity.enums.BloodType;
import com.smarthealthcare.entity.enums.Gender;
import com.smarthealthcare.entity.enums.ProfileStatus;
import com.smarthealthcare.entity.enums.UserStatus;
import com.smarthealthcare.exception.BadRequestException;
import com.smarthealthcare.repository.*;
import java.math.BigDecimal;
import java.util.Locale;
import com.smarthealthcare.security.JwtService;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository users;
  private final RoleRepository roles;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final PatientProfileRepository patientProfiles;
  private final DoctorProfileRepository doctorProfiles;

  @Transactional
  public AuthResponse register(RegisterRequest request) {
    if (users.existsByEmail(request.email())) throw new BadRequestException("Email already exists");
    Role role = roles.findByCode(request.role()).orElseThrow(() -> new BadRequestException("Invalid role"));
    User user = User.builder()
        .email(request.email())
        .phone(request.phone())
        .fullName(request.fullName())
        .passwordHash(passwordEncoder.encode(request.password()))
        .status(UserStatus.active)
        .roles(Set.of(role))
        .build();
    users.save(user);
    createProfileByRole(role.getCode(), user);
    return token(user);
  }

  @Transactional(readOnly = true)
  public AuthResponse login(LoginRequest request) {
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    return token(users.findByEmail(request.email()).orElseThrow());
  }

  private AuthResponse token(User user) {
    Set<String> roleCodes = user.getRoles().stream().map(Role::getCode).collect(Collectors.toSet());
    UserDetails details = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
        .password(user.getPasswordHash())
        .authorities(roleCodes.stream().map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + role.toUpperCase())).toList())
        .build();
    return new AuthResponse(jwtService.generate(details, roleCodes), "Bearer", user.getId(), user.getEmail(), user.getFullName(), roleCodes);
  }

  private void createProfileByRole(String roleCode, User user) {
    String normalizedRole = roleCode.toLowerCase(Locale.ROOT);
    if ("patient".equals(normalizedRole) && patientProfiles.findByUserId(user.getId()).isEmpty()) {
      String patientCode = "PT" + String.format("%06d", user.getId());
      patientProfiles.save(PatientProfile.builder()
          .user(user)
          .patientCode(patientCode)
          .gender(Gender.unknown)
          .bloodType(BloodType.unknown)
          .build());
    }

    if ("doctor".equals(normalizedRole) && doctorProfiles.findByUserId(user.getId()).isEmpty()) {
      String doctorCode = "DR" + String.format("%06d", user.getId());
      doctorProfiles.save(DoctorProfile.builder()
          .user(user)
          .doctorCode(doctorCode)
          .licenseNo("AUTO-LICENSE-" + user.getId())
          .yearsExperience(0)
          .consultationFee(BigDecimal.ZERO)
          .rating(BigDecimal.ZERO)
          .reviewCount(0)
          .status(ProfileStatus.active)
          .build());
    }
  }
}
