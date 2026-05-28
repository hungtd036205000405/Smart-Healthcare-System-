package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "services")
public class MedicalService extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "specialty_id")
  private Specialty specialty;
  @Column(nullable = false, unique = true, length = 80)
  private String code;
  @Column(nullable = false, length = 200)
  private String name;
  @Column(name = "service_type", nullable = false)
  private ServiceType serviceType;
  @Lob
  private String description;
  @Column(name = "base_price", nullable = false)
  private BigDecimal basePrice;
  @Column(name = "duration_minutes")
  private Integer durationMinutes;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private ActiveStatus status;
}
