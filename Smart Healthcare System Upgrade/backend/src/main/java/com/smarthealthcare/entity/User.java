package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.UserStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "users")
public class User extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true)
  private String email;
  @Column(unique = true, length = 30)
  private String phone;
  @Column(name = "password_hash", nullable = false)
  private String passwordHash;
  @Column(name = "full_name", nullable = false, length = 150)
  private String fullName;
  @Column(name = "avatar_url", length = 500)
  private String avatarUrl;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private UserStatus status;
  @Column(name = "email_verified_at")
  private LocalDateTime emailVerifiedAt;
  @Column(name = "last_login_at")
  private LocalDateTime lastLoginAt;
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  @Builder.Default
  private Set<Role> roles = new HashSet<>();
}
