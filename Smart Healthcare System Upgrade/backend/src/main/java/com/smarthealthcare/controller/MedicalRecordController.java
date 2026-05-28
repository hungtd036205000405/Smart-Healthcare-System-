package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {
  private final MedicalRecordService medicalRecordService;

  @GetMapping
  public ApiResponse<Page<EncounterResponse>> list(@RequestParam(required = false) Long patientId, @RequestParam(required = false) Long doctorId, Pageable pageable) {
    return ApiResponse.ok(medicalRecordService.list(patientId, doctorId, pageable));
  }

  @PostMapping
  public ApiResponse<EncounterResponse> create(@Valid @RequestBody EncounterRequest request) {
    return ApiResponse.ok("Created", medicalRecordService.create(request));
  }
}
