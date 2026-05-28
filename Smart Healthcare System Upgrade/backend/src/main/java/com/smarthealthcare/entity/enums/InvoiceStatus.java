package com.smarthealthcare.entity.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum InvoiceStatus {
  draft("draft"), issued("issued"), paid("paid"), voided("void"), refunded("refunded");

  public final String dbValue;
  InvoiceStatus(String dbValue) { this.dbValue = dbValue; }

  @Converter(autoApply = true)
  public static class InvoiceStatusConverter implements AttributeConverter<InvoiceStatus, String> {
    public String convertToDatabaseColumn(InvoiceStatus attribute) {
      return attribute == null ? null : attribute.dbValue;
    }
    public InvoiceStatus convertToEntityAttribute(String dbData) {
      if (dbData == null) return null;
      for (InvoiceStatus status : values()) if (status.dbValue.equals(dbData)) return status;
      return InvoiceStatus.valueOf(dbData);
    }
  }
}
