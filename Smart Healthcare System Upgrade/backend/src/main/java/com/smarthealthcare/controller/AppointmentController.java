package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
  private final AppointmentService appointmentService;

  @GetMapping
  public ApiResponse<Page<AppointmentResponse>> list(@RequestParam(required = false) Long patientId, @RequestParam(required = false) Long doctorId, Pageable pageable) {
    return ApiResponse.ok(appointmentService.list(patientId, doctorId, pageable));
  }

  @PostMapping
  public ApiResponse<AppointmentResponse> create(@Valid @RequestBody AppointmentRequest request) {
    return ApiResponse.ok("Booked", appointmentService.create(request));
  }

  @PatchMapping("/{id}/status")
  public ApiResponse<AppointmentResponse> status(@PathVariable Long id, @Valid @RequestBody UpdateStatusRequest request) {
    return ApiResponse.ok(appointmentService.updateStatus(id, request));
  }
}
