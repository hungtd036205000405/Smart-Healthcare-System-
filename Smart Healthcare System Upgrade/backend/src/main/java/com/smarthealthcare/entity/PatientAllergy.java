package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "patient_allergies")
public class PatientAllergy extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id", nullable = false)
  private PatientProfile patient;
  @Column(nullable = false, length = 150)
  private String allergen;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private AllergySeverity severity;
  @Column(length = 500)
  private String reaction;
  @Column(name = "discovered_on")
  private LocalDate discoveredOn;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private ActiveStatus status;
}
