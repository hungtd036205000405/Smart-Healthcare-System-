package com.smarthealthcare.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "roles")
public class Role extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true, length = 50)
  private String code;
  @Column(nullable = false, length = 100)
  private String name;
}
