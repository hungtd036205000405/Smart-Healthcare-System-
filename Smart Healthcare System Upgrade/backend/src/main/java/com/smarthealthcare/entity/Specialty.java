package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.ActiveStatus;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "specialties")
public class Specialty extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true, length = 80)
  private String code;
  @Column(nullable = false, length = 150)
  private String name;
  @Lob
  private String description;
  @Column(length = 100)
  private String icon;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private ActiveStatus status;
}
