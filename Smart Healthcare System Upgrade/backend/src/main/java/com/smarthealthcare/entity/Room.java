package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "rooms")
public class Room extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true, length = 50)
  private String code;
  @Column(length = 150)
  private String name;
  @Column(length = 50)
  private String floor;
  @Enumerated(EnumType.STRING) @Column(name = "room_type", nullable = false)
  private RoomType roomType;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private RoomStatus status;
}
