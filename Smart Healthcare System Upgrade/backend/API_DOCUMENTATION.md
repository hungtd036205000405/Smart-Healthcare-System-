# Smart Healthcare Backend API

Base URL: `http://localhost:8080/api`

## Authentication

- `POST /auth/register`
  - Body: `email`, `phone`, `password`, `fullName`, `role`
  - Role values follow `roles.code`: `patient`, `doctor`, `expert`, `consultant`, `admin`.
- `POST /auth/login`
  - Body: `email`, `password`
  - Returns JWT bearer token.
- `GET /auth/me`
  - Header: `Authorization: Bearer <token>`

## Public Catalog

- `GET /public/specialties?page=0&size=20`
- `GET /public/services?page=0&size=20`
- `GET /doctors?q=keyword&page=0&size=20`

## Patients

- `GET /patients?q=keyword&page=0&size=20`
  - Roles: `ADMIN`, `DOCTOR`

## Appointments

- `GET /appointments?patientId=1&page=0&size=20`
- `GET /appointments?doctorId=1&page=0&size=20`
- `POST /appointments`
  - Body: `patientId`, `doctorId`, `serviceId`, `specialtyId`, `roomId`, `appointmentType`, `priority`, `scheduledStart`, `scheduledEnd`, `reason`, `symptoms`
- `PATCH /appointments/{id}/status`
  - Body: `status`, `cancelReason`

## Medical Records

- `GET /medical-records?patientId=1&page=0&size=20`
- `GET /medical-records?doctorId=1&page=0&size=20`
- `POST /medical-records`
  - Body: `appointmentId`, `patientId`, `doctorId`, `specialtyId`, `chiefComplaint`, `symptoms`, `diagnosis`, `treatmentPlan`, `doctorNotes`, `nextAppointmentDate`

## Payments

- `GET /payments/invoices?patientId=1&page=0&size=20`
- `POST /payments`
  - Body: `invoiceId`, `method`, `provider`, `providerTransactionId`, `amount`

## Admin

All admin APIs require role `admin`.

- `GET /admin/stats`
- `POST /admin/specialties`
- `POST /admin/services`

## Pagination And Filtering

The API uses Spring Data pagination:

- `page`: zero-based page number
- `size`: page size
- `sort`: example `sort=createdAt,desc`

Search filters are currently implemented for doctors and patients through `q`.
