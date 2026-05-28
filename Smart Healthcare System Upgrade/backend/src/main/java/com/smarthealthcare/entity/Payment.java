package com.smarthealthcare.entity;

import com.smarthealthcare.entity.enums.*;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "payments")
public class Payment extends Auditable {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "invoice_id", nullable = false)
  private Invoice invoice;
  @Column(name = "payment_code", nullable = false, unique = true, length = 50)
  private String paymentCode;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private PaymentMethod method;
  @Column(length = 100)
  private String provider;
  @Column(name = "provider_transaction_id", length = 150)
  private String providerTransactionId;
  @Column(nullable = false)
  private BigDecimal amount;
  @Enumerated(EnumType.STRING) @Column(nullable = false)
  private PaymentStatus status;
  @Column(name = "paid_at")
  private LocalDateTime paidAt;
}
