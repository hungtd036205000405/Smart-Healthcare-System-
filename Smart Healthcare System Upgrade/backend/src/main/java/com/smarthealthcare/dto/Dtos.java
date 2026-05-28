package com.smarthealthcare.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.Set;

public class Dtos {
  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
  public record RegisterRequest(@Email @NotBlank String email, String phone, @NotBlank String password, @NotBlank String fullName, @NotBlank String role) {}
  public record AuthResponse(String accessToken, String tokenType, Long userId, String email, String fullName, Set<String> roles) {}
  public record UserResponse(Long id, String email, String phone, String fullName, String status, Set<String> roles) {}
  public record DoctorResponse(Long id, String fullName, String email, String doctorCode, String title, String licenseNo, Integer yearsExperience, BigDecimal fee, BigDecimal rating, Set<String> specialties) {}
  public record PatientResponse(Long id, String fullName, String email, String patientCode, LocalDate dateOfBirth, String gender, String address) {}
  public record SpecialtyRequest(@NotBlank String code, @NotBlank String name, String description, String icon) {}
  public record ServiceRequest(Long specialtyId, @NotBlank String code, @NotBlank String name, @NotBlank String serviceType, String description, BigDecimal basePrice, Integer durationMinutes) {}
  public record CatalogResponse(Long id, String code, String name, String type, BigDecimal price, String status) {}
  public record AppointmentRequest(@NotNull Long patientId, @NotNull Long doctorId, Long serviceId, Long specialtyId, Long roomId, String appointmentType, String priority, @NotNull LocalDateTime scheduledStart, @NotNull LocalDateTime scheduledEnd, String reason, String symptoms) {}
  public record AppointmentResponse(Long id, String code, String patientName, String doctorName, String serviceName, String status, LocalDateTime start, LocalDateTime end, String reason) {}
  public record UpdateStatusRequest(@NotBlank String status, String cancelReason) {}
  public record EncounterRequest(Long appointmentId, @NotNull Long patientId, @NotNull Long doctorId, Long specialtyId, String chiefComplaint, String symptoms, String diagnosis, String treatmentPlan, String doctorNotes, LocalDate nextAppointmentDate) {}
  public record EncounterResponse(Long id, String code, String patientName, String doctorName, String diagnosis, String status, LocalDateTime startedAt) {}
  public record PaymentRequest(@NotNull Long invoiceId, @NotBlank String method, String provider, String providerTransactionId, @NotNull BigDecimal amount) {}
  public record PaymentResponse(Long id, String code, BigDecimal amount, String method, String status, LocalDateTime paidAt) {}
}
