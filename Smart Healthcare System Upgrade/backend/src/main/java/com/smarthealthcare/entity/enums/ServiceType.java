package com.smarthealthcare.entity.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum ServiceType {
  exam("exam"), lab("lab"), imaging("imaging"), vaccination("vaccination"), pharmacy("pharmacy"),
  home_care("home_care"), online_consultation("online_consultation"), package_service("package");

  public final String dbValue;
  ServiceType(String dbValue) { this.dbValue = dbValue; }

  public static ServiceType fromDb(String value) {
    for (ServiceType type : values()) if (type.dbValue.equals(value)) return type;
    return ServiceType.valueOf(value);
  }

  @Converter(autoApply = true)
  public static class ServiceTypeConverter implements AttributeConverter<ServiceType, String> {
    public String convertToDatabaseColumn(ServiceType attribute) {
      return attribute == null ? null : attribute.dbValue;
    }
    public ServiceType convertToEntityAttribute(String dbData) {
      return dbData == null ? null : ServiceType.fromDb(dbData);
    }
  }
}
