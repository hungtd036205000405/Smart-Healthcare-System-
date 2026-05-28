package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.InvoiceStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "invoices")
public class Invoice extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "invoice_code", nullable = false, unique = true, length = 50)
  private String invoiceCode;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "appointment_id")
  private Appointment appointment;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "patient_id", nullable = false)
  private PatientProfile patient;
  private BigDecimal subtotal;
  @Column(name = "service_fee")
  private BigDecimal serviceFee;
  @Column(name = "discount_amount")
  private BigDecimal discountAmount;
  @Column(name = "tax_amount")
  private BigDecimal taxAmount;
  @Column(name = "total_amount")
  private BigDecimal totalAmount;
  @Column(nullable = false)
  private InvoiceStatus status;
  @Column(name = "issued_at")
  private LocalDateTime issuedAt;
  @Column(name = "paid_at")
  private LocalDateTime paidAt;
}
