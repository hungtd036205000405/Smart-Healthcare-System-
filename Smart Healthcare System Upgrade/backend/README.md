# Smart Healthcare Backend

Spring Boot backend generated from the existing MySQL database `smart_healthcare`.

## Stack

- Java 17
- Spring Boot 3.3
- Spring Web
- Spring Security
- JWT Authentication
- Spring Data JPA / Hibernate
- MySQL
- Maven
- Lombok
- Bean Validation
- Global Exception Handling

## Run

```bash
cd backend
mvn spring-boot:run
```

API base URL:

```text
http://localhost:8080/api
```

The backend uses:

```properties
spring.jpa.hibernate.ddl-auto=validate
```

So Hibernate validates the existing schema and does not recreate tables.

## Folder Structure

- `controller`: REST endpoints
- `service`: business logic
- `repository`: Spring Data JPA repositories
- `entity`: JPA entities mapped to MySQL tables
- `dto`: request/response DTOs
- `mapper`: entity to DTO mapping
- `security`: JWT service/filter and user details
- `config`: Spring Security config
- `exception`: global exception handling

## Frontend Analysis Summary

Frontend modules found in the React/Vite app:

- Public pages: landing, services, doctors, about.
- Auth: login role selector, register route placeholder.
- Patient: dashboard, booking, appointments route, records, consultation route, health tracking.
- Doctor: home, profile, schedule, exam, records, stats.
- Consultant: survey, consultation history, chat/video, reschedule, AI survey.
- Expert: dashboard, analytics/research placeholders.
- Admin: dashboard with overview, doctor, expert, patient and schedule management.

The backend maps the existing production database for the core frontend modules:

- Authentication
- User/role management
- Doctor management
- Patient management
- Appointment booking
- Medical services
- Specialties
- Dashboard statistics
- Payment management
- Medical records

## Database Reverse Engineering Summary

Database: `smart_healthcare`

Key tables found:

- `roles`, `users`, `user_roles`
- `patient_profiles`, `doctor_profiles`, `expert_profiles`
- `specialties`, `doctor_specialties`, `services`, `service_features`
- `rooms`, `doctor_work_schedules`
- `appointments`, `appointment_status_history`
- `encounters`, `vital_signs`, `patient_allergies`
- `prescriptions`, `prescription_items`
- `lab_test_catalog`, `lab_orders`, `lab_order_items`
- `medical_files`
- `invoices`, `invoice_items`, `payments`
- `consultation_sessions`, `chat_messages`
- `ai_surveys`, `ai_survey_answers`
- `health_metric_types`, `health_metric_readings`
- `notifications`, `audit_logs`

## Suggested Database Improvements

- Add seed data for default admin user, specialties, services and rooms.
- Add a `refresh_tokens` table for token rotation and logout/revocation.
- Add optimistic locking `version` columns for `appointments`, `encounters`, `invoices`.
- Add soft-delete fields for admin-managed catalog tables.
- Keep actual files in object storage; store metadata only in `medical_files`.
