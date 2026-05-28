package com.smarthealthcare.service;

import com.smarthealthcare.entity.enums.AppointmentStatus;
import com.smarthealthcare.repository.*;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
  private final UserRepository users;
  private final DoctorProfileRepository doctors;
  private final PatientProfileRepository patients;
  private final AppointmentRepository appointments;
  private final InvoiceRepository invoices;

  public Map<String, Object> adminStats() {
    return Map.of(
        "users", users.count(),
        "doctors", doctors.count(),
        "patients", patients.count(),
        "appointments", appointments.count(),
        "pendingAppointments", appointments.countByStatus(AppointmentStatus.pending),
        "invoices", invoices.count());
  }
}
