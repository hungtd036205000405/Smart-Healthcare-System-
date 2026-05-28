package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "patient_profiles")
public class PatientProfile extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Column(name = "patient_code", nullable = false, unique = true, length = 50)
  private String patientCode;
  @Column(name = "date_of_birth")
  private LocalDate dateOfBirth;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private Gender gender;
  @Column(length = 500)
  private String address;
  @Column(name = "emergency_contact_name", length = 150)
  private String emergencyContactName;
  @Column(name = "emergency_contact_phone", length = 30)
  private String emergencyContactPhone;
  @Column(name = "blood_type", nullable = false)
  private BloodType bloodType;
  @Column(name = "insurance_number", length = 100)
  private String insuranceNumber;
}
