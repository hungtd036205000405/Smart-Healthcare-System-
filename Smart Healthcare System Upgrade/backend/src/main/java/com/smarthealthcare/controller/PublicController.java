package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.CatalogResponse;
import com.smarthealthcare.service.CatalogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class PublicController {
  private final CatalogService catalogService;

  @GetMapping("/specialties")
  public ApiResponse<Page<CatalogResponse>> specialties(Pageable pageable) {
    return ApiResponse.ok(catalogService.specialties(pageable));
  }

  @GetMapping("/services")
  public ApiResponse<Page<CatalogResponse>> services(Pageable pageable) {
    return ApiResponse.ok(catalogService.services(pageable));
  }
}
