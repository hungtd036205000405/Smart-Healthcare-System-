package com.smarthealthcare.repository;

import com.smarthealthcare.entity.Appointment;
import com.smarthealthcare.entity.enums.AppointmentStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  Page<Appointment> findByPatientId(Long patientId, Pageable pageable);
  Page<Appointment> findByDoctorId(Long doctorId, Pageable pageable);
  long countByStatus(AppointmentStatus status);
}
