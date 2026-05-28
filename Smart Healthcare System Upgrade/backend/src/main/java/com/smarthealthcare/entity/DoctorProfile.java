package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.ProfileStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "doctor_profiles")
public class DoctorProfile extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Column(name = "doctor_code", nullable = false, unique = true, length = 50)
  private String doctorCode;
  @Column(length = 80)
  private String title;
  @Column(name = "license_no", nullable = false, unique = true, length = 100)
  private String licenseNo;
  @Column(name = "years_experience", nullable = false)
  private Integer yearsExperience;
  @Lob
  private String bio;
  @Column(name = "consultation_fee", nullable = false)
  private BigDecimal consultationFee;
  @Column(nullable = false)
  private BigDecimal rating;
  @Column(name = "review_count", nullable = false)
  private Integer reviewCount;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private ProfileStatus status;
  @ManyToMany
  @JoinTable(name = "doctor_specialties", joinColumns = @JoinColumn(name = "doctor_id"), inverseJoinColumns = @JoinColumn(name = "specialty_id"))
  @Builder.Default
  private Set<Specialty> specialties = new HashSet<>();
}
