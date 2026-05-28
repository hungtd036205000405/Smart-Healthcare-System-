package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.Encounter;
import com.smarthealthcare.entity.enums.EncounterStatus;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {
  private final EncounterRepository encounters;
  private final AppointmentRepository appointments;
  private final PatientProfileRepository patients;
  private final DoctorProfileRepository doctors;
  private final SpecialtyRepository specialties;

  public Page<EncounterResponse> list(Long patientId, Long doctorId, Pageable pageable) {
    Page<Encounter> page = patientId != null ? encounters.findByPatientId(patientId, pageable)
        : doctorId != null ? encounters.findByDoctorId(doctorId, pageable)
        : encounters.findAll(pageable);
    return page.map(EntityMapper::encounter);
  }

  @Transactional
  public EncounterResponse create(EncounterRequest request) {
    Encounter encounter = Encounter.builder()
        .encounterCode("EN" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
        .appointment(request.appointmentId() == null ? null : appointments.findById(request.appointmentId()).orElseThrow())
        .patient(patients.findById(request.patientId()).orElseThrow())
        .doctor(doctors.findById(request.doctorId()).orElseThrow())
        .specialty(request.specialtyId() == null ? null : specialties.findById(request.specialtyId()).orElseThrow())
        .startedAt(LocalDateTime.now())
        .chiefComplaint(request.chiefComplaint())
        .symptoms(request.symptoms())
        .diagnosis(request.diagnosis())
        .treatmentPlan(request.treatmentPlan())
        .doctorNotes(request.doctorNotes())
        .nextAppointmentDate(request.nextAppointmentDate())
        .status(EncounterStatus.active)
        .build();
    return EntityMapper.encounter(encounters.save(encounter));
  }
}
