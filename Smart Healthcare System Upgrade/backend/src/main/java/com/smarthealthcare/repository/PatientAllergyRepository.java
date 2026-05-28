package com.smarthealthcare.repository;

import com.smarthealthcare.entity.PatientAllergy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientAllergyRepository extends JpaRepository<PatientAllergy, Long> {}
