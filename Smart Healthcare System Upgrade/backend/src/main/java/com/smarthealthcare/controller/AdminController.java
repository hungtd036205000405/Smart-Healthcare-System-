package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.service.*;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
  private final DashboardService dashboardService;
  private final CatalogService catalogService;

  @GetMapping("/stats")
  public ApiResponse<Map<String, Object>> stats() {
    return ApiResponse.ok(dashboardService.adminStats());
  }

  @PostMapping("/specialties")
  public ApiResponse<CatalogResponse> createSpecialty(@Valid @RequestBody SpecialtyRequest request) {
    return ApiResponse.ok("Created", catalogService.createSpecialty(request));
  }

  @PostMapping("/services")
  public ApiResponse<CatalogResponse> createService(@Valid @RequestBody ServiceRequest request) {
    return ApiResponse.ok("Created", catalogService.createService(request));
  }
}
