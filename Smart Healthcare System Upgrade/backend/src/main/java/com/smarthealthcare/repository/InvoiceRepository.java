package com.smarthealthcare.repository;

import com.smarthealthcare.entity.Invoice;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
  Page<Invoice> findByPatientId(Long patientId, Pageable pageable);
}
