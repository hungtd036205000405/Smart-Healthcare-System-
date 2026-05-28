package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.Appointment;
import com.smarthealthcare.entity.enums.*;
import com.smarthealthcare.exception.ResourceNotFoundException;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.*;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AppointmentService {
  private final AppointmentRepository appointments;
  private final PatientProfileRepository patients;
  private final DoctorProfileRepository doctors;
  private final MedicalServiceRepository services;
  private final SpecialtyRepository specialties;
  private final RoomRepository rooms;

  public Page<AppointmentResponse> list(Long patientId, Long doctorId, Pageable pageable) {
    Page<Appointment> page = patientId != null ? appointments.findByPatientId(patientId, pageable)
        : doctorId != null ? appointments.findByDoctorId(doctorId, pageable)
        : appointments.findAll(pageable);
    return page.map(EntityMapper::appointment);
  }

  @Transactional
  public AppointmentResponse create(AppointmentRequest request) {
    var patient = patients.findById(request.patientId())
        .or(() -> patients.findByUserId(request.patientId()))
        .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
    var doctor = doctors.findById(request.doctorId())
        .or(() -> doctors.findByUserId(request.doctorId()))
        .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

    Appointment appointment = Appointment.builder()
        .appointmentCode("BK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
        .patient(patient)
        .doctor(doctor)
        .service(request.serviceId() == null ? null : services.findById(request.serviceId()).orElseThrow())
        .specialty(request.specialtyId() == null ? null : specialties.findById(request.specialtyId()).orElseThrow())
        .room(request.roomId() == null ? null : rooms.findById(request.roomId()).orElseThrow())
        .appointmentType(request.appointmentType() == null ? AppointmentType.offline : AppointmentType.valueOf(request.appointmentType()))
        .priority(request.priority() == null ? Priority.normal : Priority.valueOf(request.priority()))
        .status(AppointmentStatus.pending)
        .scheduledStart(request.scheduledStart())
        .scheduledEnd(request.scheduledEnd())
        .reason(request.reason())
        .symptoms(request.symptoms())
        .build();
    return EntityMapper.appointment(appointments.save(appointment));
  }

  @Transactional
  public AppointmentResponse updateStatus(Long id, UpdateStatusRequest request) {
    Appointment appointment = appointments.findById(id).orElseThrow();
    appointment.setStatus(AppointmentStatus.valueOf(request.status()));
    appointment.setCancelReason(request.cancelReason());
    return EntityMapper.appointment(appointment);
  }
}
