package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.DoctorResponse;
import com.smarthealthcare.service.PeopleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {
  private final PeopleService peopleService;

  @GetMapping
  public ApiResponse<Page<DoctorResponse>> list(@RequestParam(required = false) String q, Pageable pageable) {
    return ApiResponse.ok(peopleService.doctors(q, pageable));
  }
}
