package com.smarthealthcare.service;

import com.smarthealthcare.dto.Dtos.*;
import com.smarthealthcare.entity.Payment;
import com.smarthealthcare.entity.enums.*;
import com.smarthealthcare.mapper.EntityMapper;
import com.smarthealthcare.repository.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {
  private final InvoiceRepository invoices;
  private final PaymentRepository payments;

  public Page<?> invoices(Long patientId, Pageable pageable) {
    return patientId == null ? invoices.findAll(pageable) : invoices.findByPatientId(patientId, pageable);
  }

  @Transactional
  public PaymentResponse pay(PaymentRequest request) {
    var invoice = invoices.findById(request.invoiceId()).orElseThrow();
    Payment payment = Payment.builder()
        .invoice(invoice)
        .paymentCode("PAY" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
        .method(PaymentMethod.valueOf(request.method()))
        .provider(request.provider())
        .providerTransactionId(request.providerTransactionId())
        .amount(request.amount())
        .status(PaymentStatus.success)
        .paidAt(LocalDateTime.now())
        .build();
    invoice.setStatus(InvoiceStatus.paid);
    invoice.setPaidAt(payment.getPaidAt());
    return EntityMapper.payment(payments.save(payment));
  }
}
