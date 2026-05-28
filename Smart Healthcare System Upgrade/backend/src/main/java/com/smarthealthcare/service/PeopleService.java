package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PeopleService {
  private final DoctorProfileRepository doctors;
  private final PatientProfileRepository patients;

  public Page<DoctorResponse> doctors(String query, Pageable pageable) {
    return doctors.search(query, pageable).map(EntityMapper::doctor);
  }

  public Page<PatientResponse> patients(String query, Pageable pageable) {
    return patients.search(query, pageable).map(EntityMapper::patient);
  }
}
