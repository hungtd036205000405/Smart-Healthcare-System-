package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.ProfileStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "expert_profiles")
public class ExpertProfile extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Column(name = "expert_code", nullable = false, unique = true, length = 50)
  private String expertCode;
  @Column(length = 150)
  private String position;
  @Column(length = 150)
  private String department;
  @Column(name = "specialty_text", length = 150)
  private String specialtyText;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private ProfileStatus status;
}
