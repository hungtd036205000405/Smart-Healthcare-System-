package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.*;
import com.smarthealthcare.entity.enums.*;
import com.smarthealthcare.exception.ResourceNotFoundException;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.*;
import java.math.BigDecimal;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CatalogService {
  private final SpecialtyRepository specialties;
  private final MedicalServiceRepository services;

  public Page<CatalogResponse> specialties(Pageable pageable) {
    return specialties.findAll(pageable).map(EntityMapper::specialty);
  }

  public Page<CatalogResponse> services(Pageable pageable) {
    return services.findAll(pageable).map(EntityMapper::service);
  }

  @Transactional
  public CatalogResponse createSpecialty(SpecialtyRequest request) {
    Specialty specialty = Specialty.builder()
        .code(request.code())
        .name(request.name())
        .description(request.description())
        .icon(request.icon())
        .status(ActiveStatus.active)
        .build();
    return EntityMapper.specialty(specialties.save(specialty));
  }

  @Transactional
  public CatalogResponse createService(ServiceRequest request) {
    MedicalService service = MedicalService.builder()
        .specialty(request.specialtyId() == null ? null : specialties.findById(request.specialtyId()).orElseThrow(() -> new ResourceNotFoundException("Specialty not found")))
        .code(request.code())
        .name(request.name())
        .serviceType(ServiceType.fromDb(request.serviceType()))
        .description(request.description())
        .basePrice(Optional.ofNullable(request.basePrice()).orElse(BigDecimal.ZERO))
        .durationMinutes(request.durationMinutes())
        .status(ActiveStatus.active)
        .build();
    return EntityMapper.service(services.save(service));
  }
}
