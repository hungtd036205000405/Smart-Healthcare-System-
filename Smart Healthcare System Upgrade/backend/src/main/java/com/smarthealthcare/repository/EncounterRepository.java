package com.smarthealthcare.repository;

import com.smarthealthcare.entity.Encounter;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EncounterRepository extends JpaRepository<Encounter, Long> {
  Page<Encounter> findByPatientId(Long patientId, Pageable pageable);
  Page<Encounter> findByDoctorId(Long doctorId, Pageable pageable);
}
