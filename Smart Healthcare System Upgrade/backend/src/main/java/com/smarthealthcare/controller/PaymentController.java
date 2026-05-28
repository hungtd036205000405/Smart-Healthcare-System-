package com.smarthealthcare.controller;

import com.smarthealthcare.dto.ApiResponse;
import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
  private final PaymentService paymentService;

  @GetMapping("/invoices")
  public ApiResponse<Page<?>> invoices(@RequestParam(required = false) Long patientId, Pageable pageable) {
    return ApiResponse.ok(paymentService.invoices(patientId, pageable));
  }

  @PostMapping
  public ApiResponse<PaymentResponse> pay(@Valid @RequestBody PaymentRequest request) {
    return ApiResponse.ok("Paid", paymentService.pay(request));
  }
}
