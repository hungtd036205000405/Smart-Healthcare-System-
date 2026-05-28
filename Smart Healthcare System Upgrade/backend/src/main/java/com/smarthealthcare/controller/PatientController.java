package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.PatientResponse;
import com.smarthealthcare.service.PeopleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {
  private final PeopleService peopleService;

  @GetMapping
  @PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
  public ApiResponse<Page<PatientResponse>> list(@RequestParam(required = false) String q, Pageable pageable) {
    return ApiResponse.ok(peopleService.patients(q, pageable));
  }
}
