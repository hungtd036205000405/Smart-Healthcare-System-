package com.smarthealthcare.entity.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum BloodType {
  A_POSITIVE("A+"), A_NEGATIVE("A-"), B_POSITIVE("B+"), B_NEGATIVE("B-"),
  AB_POSITIVE("AB+"), AB_NEGATIVE("AB-"), O_POSITIVE("O+"), O_NEGATIVE("O-"),
  unknown("unknown");

  public final String dbValue;
  BloodType(String dbValue) { this.dbValue = dbValue; }

  @Converter(autoApply = true)
  public static class BloodTypeConverter implements AttributeConverter<BloodType, String> {
    public String convertToDatabaseColumn(BloodType attribute) {
      return attribute == null ? null : attribute.dbValue;
    }
    public BloodType convertToEntityAttribute(String dbData) {
      if (dbData == null) return null;
      for (BloodType type : values()) if (type.dbValue.equals(dbData)) return type;
      return unknown;
    }
  }
}
