package com.smarthealthcare.mapper;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.*;
import java.util.stream.Collectors;

public final class EntityMapper {
  private EntityMapper() {}

  public static UserResponse user(User user) {
    return new UserResponse(user.getId(), user.getEmail(), user.getPhone(), user.getFullName(), String.valueOf(user.getStatus()), user.getRoles().stream().map(Role::getCode).collect(Collectors.toSet()));
  }
  public static DoctorResponse doctor(DoctorProfile doctor) {
    return new DoctorResponse(doctor.getId(), doctor.getUser().getFullName(), doctor.getUser().getEmail(), doctor.getDoctorCode(), doctor.getTitle(), doctor.getLicenseNo(), doctor.getYearsExperience(), doctor.getConsultationFee(), doctor.getRating(), doctor.getSpecialties().stream().map(Specialty::getName).collect(Collectors.toSet()));
  }
  public static PatientResponse patient(PatientProfile patient) {
    return new PatientResponse(patient.getId(), patient.getUser().getFullName(), patient.getUser().getEmail(), patient.getPatientCode(), patient.getDateOfBirth(), String.valueOf(patient.getGender()), patient.getAddress());
  }
  public static CatalogResponse specialty(Specialty specialty) {
    return new CatalogResponse(specialty.getId(), specialty.getCode(), specialty.getName(), "specialty", null, String.valueOf(specialty.getStatus()));
  }
  public static CatalogResponse service(MedicalService service) {
    return new CatalogResponse(service.getId(), service.getCode(), service.getName(), String.valueOf(service.getServiceType()), service.getBasePrice(), String.valueOf(service.getStatus()));
  }
  public static AppointmentResponse appointment(Appointment appointment) {
    return new AppointmentResponse(appointment.getId(), appointment.getAppointmentCode(), appointment.getPatient().getUser().getFullName(), appointment.getDoctor().getUser().getFullName(), appointment.getService() == null ? null : appointment.getService().getName(), String.valueOf(appointment.getStatus()), appointment.getScheduledStart(), appointment.getScheduledEnd(), appointment.getReason());
  }
  public static EncounterResponse encounter(Encounter encounter) {
    return new EncounterResponse(encounter.getId(), encounter.getEncounterCode(), encounter.getPatient().getUser().getFullName(), encounter.getDoctor().getUser().getFullName(), encounter.getDiagnosis(), String.valueOf(encounter.getStatus()), encounter.getStartedAt());
  }
  public static PaymentResponse payment(Payment payment) {
    return new PaymentResponse(payment.getId(), payment.getPaymentCode(), payment.getAmount(), String.valueOf(payment.getMethod()), String.valueOf(payment.getStatus()), payment.getPaidAt());
  }
}
