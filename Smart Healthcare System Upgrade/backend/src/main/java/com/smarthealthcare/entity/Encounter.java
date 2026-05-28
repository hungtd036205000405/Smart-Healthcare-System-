package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.EncounterStatus;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "encounters")
public class Encounter extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "encounter_code", nullable = false, unique = true, length = 50)
  private String encounterCode;
  @OneToOne(fetch = FetchType.LAZY) @JoinColumn(name = "appointment_id")
  private Appointment appointment;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id", nullable = false)
  private PatientProfile patient;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "doctor_id", nullable = false)
  private DoctorProfile doctor;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "specialty_id")
  private Specialty specialty;
  @Column(name = "started_at")
  private LocalDateTime startedAt;
  @Column(name = "ended_at")
  private LocalDateTime endedAt;
  @Column(name = "chief_complaint", length = 500)
  private String chiefComplaint;
  @Lob
  private String symptoms;
  @Lob
  private String diagnosis;
  @Lob @Column(name = "treatment_plan")
  private String treatmentPlan;
  @Lob @Column(name = "doctor_notes")
  private String doctorNotes;
  @Column(name = "next_appointment_date")
  private LocalDate nextAppointmentDate;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private EncounterStatus status;
}
