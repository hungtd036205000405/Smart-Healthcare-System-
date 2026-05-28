package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "appointments")
public class Appointment extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "appointment_code", nullable = false, unique = true, length = 50)
  private String appointmentCode;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id", nullable = false)
  private PatientProfile patient;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "doctor_id", nullable = false)
  private DoctorProfile doctor;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "service_id")
  private MedicalService service;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "specialty_id")
  private Specialty specialty;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "room_id")
  private Room room;
  @Enumerated(EnumType.STRING) @Column(name = "appointment_type", nullable = false)
  private AppointmentType appointmentType;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private Priority priority;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private AppointmentStatus status;
  @Column(name = "scheduled_start", nullable = false)
  private LocalDateTime scheduledStart;
  @Column(name = "scheduled_end", nullable = false)
  private LocalDateTime scheduledEnd;
  @Column(length = 500)
  private String reason;
  @Lob
  private String symptoms;
  @Column(name = "cancel_reason", length = 500)
  private String cancelReason;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "created_by")
  private User createdBy;
}
