# Smart Healthcare System - Database Design

## 1. Phan tich frontend hien tai

Source React/Vite nam o `Smart-Healthcare-System--main/Smart Healthcare System Upgrade/src/app`.

Route va vai tro:
- Public: trang chu, dich vu, bac si, gioi thieu, health tips.
- Auth: login, register.
- Patient: dashboard, dat lich, lich hen, ho so benh an, tu van online, health tracking.
- Doctor: home, profile, schedule, exam, records, stats.
- Expert: dashboard, analytics, research.
- Consultant: dashboard, lich su tu van, chuyen gia theo doi.
- Admin: dashboard, nhan su, doanh thu; trong dashboard co tab tong quan, doctors, experts, patients, schedule.

UI/UX va luong nghiep vu:
- Dang nhap hien tai la chon role truc tiep: patient, doctor, expert, consultant, admin. Backend can RBAC ro rang.
- Dat lich gom 3 buoc: chon chuyen khoa, chon bac si + ngay gio, xac nhan + thanh toan tai phong kham hoac online.
- Doctor dashboard co worklist theo status: waiting, in_progress, completed; co symptoms, priority, vital signs, allergy, video call, chat, diagnosis, prescription, lab tests.
- Patient records hien thi report, prescription, image, allergies, files, vital signs.
- Services page gom dich vu kham, dich vu bo sung, goi kham suc khoe.
- Admin can CRUD bac si, expert, patient, lich lam viec, thong ke doanh thu va xuat bao cao.
- Consultant/Expert co tu van chat/video, lich hen, lich su, rating, thong bao, AI survey va noi dung benh hoc.

## 2. Danh sach bang va ly do

- `roles`, `users`, `user_roles`: xac thuc, tai khoan va phan quyen nhieu vai tro.
- `patient_profiles`, `doctor_profiles`, `expert_profiles`: tach profile theo nghiep vu, tranh nullable columns trong `users`.
- `specialties`, `doctor_specialties`: quan ly chuyen khoa va bac si co the thuoc nhieu chuyen khoa.
- `services`, `service_features`: danh muc dich vu kham, xet nghiem, online consultation, home care, package.
- `rooms`: phong kham, phong xet nghiem, phong tu van.
- `doctor_work_schedules`: lich lam viec mau cua bac si theo thu, gio, phong, gioi han benh nhan.
- `appointments`, `appointment_status_history`: lich hen va lich su doi trang thai.
- `encounters`: mot lan kham/benh an gan voi appointment, luu trieu chung, chan doan, phac do, ghi chu.
- `vital_signs`: sinh hieu theo encounter hoac health tracking tai nha.
- `patient_allergies`: di ung rieng cua benh nhan.
- `prescriptions`, `prescription_items`: don thuoc va tung thuoc, dat 3NF thay vi luu text gop.
- `lab_test_catalog`, `lab_orders`, `lab_order_items`: danh muc xet nghiem, phieu chi dinh, ket qua tung chi so.
- `medical_files`: file PDF, anh chup, ket qua, hinh anh y khoa.
- `invoices`, `invoice_items`, `payments`: hoa don, chi tiet thu, giao dich thanh toan.
- `consultation_sessions`, `chat_messages`: tu van chat/video va tin nhan.
- `ai_surveys`, `ai_survey_answers`: khao sat AI va cau tra loi.
- `health_metric_types`, `health_metric_readings`: theo doi suc khoe mo rong duoc cho nhip tim, huyet ap, glucose, can nang.
- `notifications`: thong bao lich hen, tin nhan, thanh toan, reminder.
- `audit_logs`: audit production cho thao tac admin/doctor tren du lieu nhay cam.

## 3. Relationship dang text

```text
roles 1--N user_roles N--1 users
users 1--0..1 patient_profiles
users 1--0..1 doctor_profiles
users 1--0..1 expert_profiles

specialties 1--N services
doctor_profiles N--N specialties qua doctor_specialties
doctor_profiles 1--N doctor_work_schedules N--1 rooms

patient_profiles 1--N appointments N--1 doctor_profiles
appointments N--1 services
appointments N--1 specialties
appointments N--1 rooms
appointments 1--N appointment_status_history

appointments 0..1--1 encounters
patient_profiles 1--N encounters N--1 doctor_profiles
encounters 1--N vital_signs
patient_profiles 1--N patient_allergies

encounters 1--N prescriptions 1--N prescription_items
encounters 1--N lab_orders 1--N lab_order_items N--1 lab_test_catalog
patient_profiles 1--N medical_files

appointments 0..1--N invoices 1--N invoice_items
invoices 1--N payments

patient_profiles 1--N consultation_sessions
consultation_sessions 1--N chat_messages
patient_profiles 1--N ai_surveys 1--N ai_survey_answers
patient_profiles 1--N health_metric_readings N--1 health_metric_types
users 1--N notifications
users 1--N audit_logs
```

## 4. Thu tu tao bang

1. `roles`, `users`, `user_roles`
2. `specialties`
3. `patient_profiles`, `doctor_profiles`, `expert_profiles`
4. `doctor_specialties`, `services`, `service_features`, `rooms`
5. `doctor_work_schedules`
6. `appointments`, `appointment_status_history`
7. `encounters`, `vital_signs`, `patient_allergies`
8. `prescriptions`, `prescription_items`
9. `lab_test_catalog`, `lab_orders`, `lab_order_items`, `medical_files`
10. `invoices`, `invoice_items`, `payments`
11. `consultation_sessions`, `chat_messages`
12. `ai_surveys`, `ai_survey_answers`
13. `health_metric_types`, `health_metric_readings`
14. `notifications`, `audit_logs`

## 5. API backend de xuat

Auth/RBAC:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/roles`

Public:
- `GET /api/specialties`
- `GET /api/services`
- `GET /api/doctors`
- `GET /api/doctors/:id`
- `GET /api/doctors/:id/available-slots`

Patient:
- `GET /api/patient/dashboard`
- `GET /api/patient/profile`
- `PUT /api/patient/profile`
- `POST /api/appointments`
- `GET /api/patient/appointments`
- `PATCH /api/appointments/:id/cancel`
- `GET /api/patient/records`
- `GET /api/patient/prescriptions`
- `GET /api/patient/lab-results`
- `GET /api/patient/allergies`
- `POST /api/patient/health-metrics`
- `GET /api/patient/health-metrics`

Doctor:
- `GET /api/doctor/dashboard`
- `GET /api/doctor/schedule`
- `PUT /api/doctor/schedule/:id`
- `GET /api/doctor/appointments`
- `PATCH /api/appointments/:id/status`
- `POST /api/encounters`
- `PUT /api/encounters/:id`
- `POST /api/encounters/:id/prescriptions`
- `POST /api/encounters/:id/lab-orders`
- `POST /api/medical-files`

Consultation:
- `POST /api/consultations`
- `GET /api/consultations`
- `PATCH /api/consultations/:id/status`
- `GET /api/consultations/:id/messages`
- `POST /api/consultations/:id/messages`
- `POST /api/ai-surveys`
- `POST /api/ai-surveys/:id/answers`
- `GET /api/ai-surveys/:id/recommendation`

Payment:
- `POST /api/invoices`
- `GET /api/invoices/:id`
- `POST /api/payments`
- `GET /api/payments/:id`
- `POST /api/payments/:id/refund`

Admin:
- `GET /api/admin/stats`
- `GET /api/admin/doctors`
- `POST /api/admin/doctors`
- `PUT /api/admin/doctors/:id`
- `DELETE /api/admin/doctors/:id`
- `GET /api/admin/experts`
- `POST /api/admin/experts`
- `GET /api/admin/patients`
- `GET /api/admin/appointments`
- `GET /api/admin/work-schedules`
- `POST /api/admin/work-schedules`
- `PUT /api/admin/work-schedules/:id`
- `GET /api/admin/revenue-report`

## 6. File SQL

Toan bo SQL `CREATE TABLE`, PK, FK, enum, index nam trong:

`smart_healthcare_schema.sql`
