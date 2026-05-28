package com.smarthealthcare.config;

import com.smarthealthcare.entity.DoctorProfile;
import com.smarthealthcare.entity.Role;
import com.smarthealthcare.entity.User;
import com.smarthealthcare.entity.enums.ProfileStatus;
import com.smarthealthcare.entity.enums.UserStatus;
import com.smarthealthcare.repository.DoctorProfileRepository;
import com.smarthealthcare.repository.RoleRepository;
import com.smarthealthcare.repository.UserRepository;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
  private final RoleRepository roles;
  private final UserRepository users;
  private final DoctorProfileRepository doctors;
  private final PasswordEncoder passwordEncoder;

  @Override
  @Transactional
  public void run(String... args) {
    seedRoles();
    seedDemoAdmin();
    seedDemoDoctor();
  }

  private void seedRoles() {
    seedRole("admin", "Administrator");
    seedRole("doctor", "Doctor");
    seedRole("patient", "Patient");
    seedRole("expert", "Expert");
    seedRole("consultant", "Consultant");
  }

  private void seedRole(String code, String name) {
    if (roles.existsByCode(code)) return;
    roles.save(Role.builder().code(code).name(name).build());
  }

  private void seedDemoDoctor() {
    if (users.existsByEmail("doctor@smarthealth.local")) return;

    Role doctorRole = roles.findByCode("doctor").orElseThrow();
    User doctorUser = users.save(User.builder()
        .email("doctor@smarthealth.local")
        .phone("0900000001")
        .passwordHash(passwordEncoder.encode("Doctor@123"))
        .fullName("BS. Demo")
        .status(UserStatus.active)
        .roles(new HashSet<>(List.of(doctorRole)))
        .build());

    if (doctors.findByUserId(doctorUser.getId()).isEmpty()) {
      doctors.save(DoctorProfile.builder()
          .user(doctorUser)
          .doctorCode("DRDEMO001")
          .title("Bac si tong quat")
          .licenseNo("LIC-DEMO-001")
          .yearsExperience(8)
          .consultationFee(new BigDecimal("300000"))
          .rating(new BigDecimal("4.8"))
          .reviewCount(120)
          .status(ProfileStatus.active)
          .build());
    }
  }

  private void seedDemoAdmin() {
    if (users.existsByEmail("admin@smarthealth.local")) return;

    Role adminRole = roles.findByCode("admin").orElseThrow();
    users.save(User.builder()
        .email("admin@smarthealth.local")
        .phone("0900000000")
        .passwordHash(passwordEncoder.encode("Admin@123"))
        .fullName("Admin Demo")
        .status(UserStatus.active)
        .roles(new HashSet<>(List.of(adminRole)))
        .build());
  }
}
