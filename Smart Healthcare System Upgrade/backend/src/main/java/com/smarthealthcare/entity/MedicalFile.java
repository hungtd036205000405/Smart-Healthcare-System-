package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.FileType;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "medical_files")
public class MedicalFile extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id", nullable = false)
  private PatientProfile patient;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "encounter_id")
  private Encounter encounter;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "uploaded_by")
  private User uploadedBy;
  @Enumerated(EnumType.STRING) @Column(name = "file_type", nullable = false)
  private FileType fileType;
  @Column(nullable = false, length = 200)
  private String title;
  @Column(name = "file_name", nullable = false)
  private String fileName;
  @Column(name = "file_url", nullable = false, length = 1000)
  private String fileUrl;
  @Column(name = "mime_type", length = 100)
  private String mimeType;
  @Column(name = "file_size_bytes")
  private Long fileSizeBytes;
  @Column(name = "is_important", nullable = false)
  private Boolean important;
}
