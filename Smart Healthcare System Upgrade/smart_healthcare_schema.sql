CREATE DATABASE IF NOT EXISTS smart_healthcare
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE smart_healthcare;

CREATE TABLE roles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  avatar_url VARCHAR(500),
  status ENUM('active','inactive','locked','pending') NOT NULL DEFAULT 'pending',
  email_verified_at DATETIME,
  last_login_at DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_status (status),
  INDEX idx_users_full_name (full_name)
) ENGINE=InnoDB;

CREATE TABLE user_roles (
  user_id BIGINT UNSIGNED NOT NULL,
  role_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB;

CREATE TABLE specialties (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_specialties_status (status)
) ENGINE=InnoDB;

CREATE TABLE patient_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  patient_code VARCHAR(50) NOT NULL UNIQUE,
  date_of_birth DATE,
  gender ENUM('male','female','other','unknown') NOT NULL DEFAULT 'unknown',
  address VARCHAR(500),
  emergency_contact_name VARCHAR(150),
  emergency_contact_phone VARCHAR(30),
  blood_type ENUM('A+','A-','B+','B-','AB+','AB-','O+','O-','unknown') NOT NULL DEFAULT 'unknown',
  insurance_number VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_patient_user FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE doctor_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  doctor_code VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(80),
  license_no VARCHAR(100) NOT NULL UNIQUE,
  years_experience SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  bio TEXT,
  consultation_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
  rating DECIMAL(3,2) NOT NULL DEFAULT 0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_doctor_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_doctors_status (status),
  INDEX idx_doctors_rating (rating)
) ENGINE=InnoDB;

CREATE TABLE expert_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL UNIQUE,
  expert_code VARCHAR(50) NOT NULL UNIQUE,
  position VARCHAR(150),
  department VARCHAR(150),
  specialty_text VARCHAR(150),
  status ENUM('active','inactive','suspended') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_expert_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_experts_status (status)
) ENGINE=InnoDB;

CREATE TABLE doctor_specialties (
  doctor_id BIGINT UNSIGNED NOT NULL,
  specialty_id BIGINT UNSIGNED NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (doctor_id, specialty_id),
  CONSTRAINT fk_doc_spec_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id),
  CONSTRAINT fk_doc_spec_specialty FOREIGN KEY (specialty_id) REFERENCES specialties(id),
  INDEX idx_doc_spec_specialty (specialty_id)
) ENGINE=InnoDB;

CREATE TABLE services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  specialty_id BIGINT UNSIGNED,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  service_type ENUM('exam','lab','imaging','vaccination','pharmacy','home_care','online_consultation','package') NOT NULL,
  description TEXT,
  base_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  duration_minutes SMALLINT UNSIGNED,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_services_specialty FOREIGN KEY (specialty_id) REFERENCES specialties(id),
  INDEX idx_services_specialty (specialty_id),
  INDEX idx_services_type_status (service_type, status)
) ENGINE=InnoDB;

CREATE TABLE service_features (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_id BIGINT UNSIGNED NOT NULL,
  feature_text VARCHAR(255) NOT NULL,
  display_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_service_features_service FOREIGN KEY (service_id) REFERENCES services(id),
  INDEX idx_service_features_service (service_id, display_order)
) ENGINE=InnoDB;

CREATE TABLE rooms (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150),
  floor VARCHAR(50),
  room_type ENUM('exam','lab','imaging','consultation','operation','other') NOT NULL DEFAULT 'exam',
  status ENUM('active','maintenance','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE doctor_work_schedules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doctor_id BIGINT UNSIGNED NOT NULL,
  room_id BIGINT UNSIGNED,
  day_of_week TINYINT UNSIGNED NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_minutes SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  max_patients SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  effective_from DATE NOT NULL,
  effective_to DATE,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_work_schedule_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id),
  CONSTRAINT fk_work_schedule_room FOREIGN KEY (room_id) REFERENCES rooms(id),
  CONSTRAINT chk_work_schedule_day CHECK (day_of_week BETWEEN 1 AND 7),
  CONSTRAINT chk_work_schedule_time CHECK (start_time < end_time),
  INDEX idx_work_schedules_doctor_day (doctor_id, day_of_week, status),
  INDEX idx_work_schedules_room (room_id)
) ENGINE=InnoDB;

CREATE TABLE appointments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_code VARCHAR(50) NOT NULL UNIQUE,
  patient_id BIGINT UNSIGNED NOT NULL,
  doctor_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED,
  specialty_id BIGINT UNSIGNED,
  room_id BIGINT UNSIGNED,
  appointment_type ENUM('offline','online') NOT NULL DEFAULT 'offline',
  priority ENUM('normal','high','urgent') NOT NULL DEFAULT 'normal',
  status ENUM('pending','confirmed','waiting','in_progress','completed','cancelled','no_show') NOT NULL DEFAULT 'pending',
  scheduled_start DATETIME NOT NULL,
  scheduled_end DATETIME NOT NULL,
  reason VARCHAR(500),
  symptoms LONGTEXT,
  cancel_reason VARCHAR(500),
  created_by BIGINT UNSIGNED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_appointments_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_appointments_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id),
  CONSTRAINT fk_appointments_service FOREIGN KEY (service_id) REFERENCES services(id),
  CONSTRAINT fk_appointments_specialty FOREIGN KEY (specialty_id) REFERENCES specialties(id),
  CONSTRAINT fk_appointments_room FOREIGN KEY (room_id) REFERENCES rooms(id),
  CONSTRAINT fk_appointments_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT chk_appointment_time CHECK (scheduled_start < scheduled_end),
  INDEX idx_appointments_patient_date (patient_id, scheduled_start),
  INDEX idx_appointments_doctor_date_status (doctor_id, scheduled_start, status),
  INDEX idx_appointments_status_date (status, scheduled_start)
) ENGINE=InnoDB;

CREATE TABLE appointment_status_history (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED NOT NULL,
  old_status ENUM('pending','confirmed','waiting','in_progress','completed','cancelled','no_show'),
  new_status ENUM('pending','confirmed','waiting','in_progress','completed','cancelled','no_show') NOT NULL,
  changed_by BIGINT UNSIGNED,
  note VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_apt_history_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_apt_history_user FOREIGN KEY (changed_by) REFERENCES users(id),
  INDEX idx_apt_history_appointment (appointment_id, created_at)
) ENGINE=InnoDB;

CREATE TABLE encounters (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  encounter_code VARCHAR(50) NOT NULL UNIQUE,
  appointment_id BIGINT UNSIGNED UNIQUE,
  patient_id BIGINT UNSIGNED NOT NULL,
  doctor_id BIGINT UNSIGNED NOT NULL,
  specialty_id BIGINT UNSIGNED,
  started_at DATETIME,
  ended_at DATETIME,
  chief_complaint VARCHAR(500),
  symptoms TEXT,
  diagnosis TEXT,
  treatment_plan TEXT,
  doctor_notes TEXT,
  next_appointment_date DATE,
  status ENUM('draft','active','completed','archived') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_encounters_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_encounters_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_encounters_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id),
  CONSTRAINT fk_encounters_specialty FOREIGN KEY (specialty_id) REFERENCES specialties(id),
  INDEX idx_encounters_patient_date (patient_id, started_at),
  INDEX idx_encounters_doctor_status (doctor_id, status)
) ENGINE=InnoDB;

CREATE TABLE vital_signs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT UNSIGNED NOT NULL,
  encounter_id BIGINT UNSIGNED,
  measured_at DATETIME NOT NULL,
  systolic_bp SMALLINT UNSIGNED,
  diastolic_bp SMALLINT UNSIGNED,
  heart_rate SMALLINT UNSIGNED,
  temperature DECIMAL(4,1),
  spo2 DECIMAL(5,2),
  weight_kg DECIMAL(6,2),
  height_cm DECIMAL(6,2),
  glucose_mg_dl DECIMAL(7,2),
  note VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_vitals_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_vitals_encounter FOREIGN KEY (encounter_id) REFERENCES encounters(id),
  INDEX idx_vitals_patient_time (patient_id, measured_at)
) ENGINE=InnoDB;

CREATE TABLE patient_allergies (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT UNSIGNED NOT NULL,
  allergen VARCHAR(150) NOT NULL,
  severity ENUM('low','medium','high','critical') NOT NULL DEFAULT 'medium',
  reaction VARCHAR(500),
  discovered_on DATE,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_allergies_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  UNIQUE KEY uk_patient_allergen (patient_id, allergen),
  INDEX idx_allergies_patient_status (patient_id, status)
) ENGINE=InnoDB;

CREATE TABLE prescriptions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  encounter_id BIGINT UNSIGNED NOT NULL,
  prescription_code VARCHAR(50) NOT NULL UNIQUE,
  status ENUM('active','completed','cancelled') NOT NULL DEFAULT 'active',
  notes TEXT,
  issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_prescriptions_encounter FOREIGN KEY (encounter_id) REFERENCES encounters(id),
  INDEX idx_prescriptions_encounter (encounter_id),
  INDEX idx_prescriptions_status (status)
) ENGINE=InnoDB;

CREATE TABLE prescription_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prescription_id BIGINT UNSIGNED NOT NULL,
  medication_name VARCHAR(200) NOT NULL,
  strength VARCHAR(100),
  dosage VARCHAR(150) NOT NULL,
  frequency VARCHAR(150),
  duration VARCHAR(100),
  instructions VARCHAR(500),
  morning BOOLEAN NOT NULL DEFAULT FALSE,
  noon BOOLEAN NOT NULL DEFAULT FALSE,
  evening BOOLEAN NOT NULL DEFAULT FALSE,
  night BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_prescription_items_prescription FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
  INDEX idx_prescription_items_prescription (prescription_id)
) ENGINE=InnoDB;

CREATE TABLE lab_test_catalog (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(150),
  base_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_lab_catalog_status (status)
) ENGINE=InnoDB;

CREATE TABLE lab_orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  encounter_id BIGINT UNSIGNED NOT NULL,
  order_code VARCHAR(50) NOT NULL UNIQUE,
  status ENUM('ordered','sample_collected','processing','completed','cancelled') NOT NULL DEFAULT 'ordered',
  ordered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  note VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lab_orders_encounter FOREIGN KEY (encounter_id) REFERENCES encounters(id),
  INDEX idx_lab_orders_encounter_status (encounter_id, status)
) ENGINE=InnoDB;

CREATE TABLE lab_order_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lab_order_id BIGINT UNSIGNED NOT NULL,
  lab_test_id BIGINT UNSIGNED NOT NULL,
  result_value VARCHAR(255),
  result_unit VARCHAR(50),
  reference_range VARCHAR(100),
  interpretation ENUM('normal','abnormal','critical','unknown') NOT NULL DEFAULT 'unknown',
  result_note TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_lab_items_order FOREIGN KEY (lab_order_id) REFERENCES lab_orders(id),
  CONSTRAINT fk_lab_items_test FOREIGN KEY (lab_test_id) REFERENCES lab_test_catalog(id),
  UNIQUE KEY uk_lab_order_test (lab_order_id, lab_test_id)
) ENGINE=InnoDB;

CREATE TABLE medical_files (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT UNSIGNED NOT NULL,
  encounter_id BIGINT UNSIGNED,
  lab_order_id BIGINT UNSIGNED,
  uploaded_by BIGINT UNSIGNED,
  file_type ENUM('pdf','image','video','document','other') NOT NULL DEFAULT 'document',
  title VARCHAR(200) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(1000) NOT NULL,
  mime_type VARCHAR(100),
  file_size_bytes BIGINT UNSIGNED,
  is_important BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_med_files_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_med_files_encounter FOREIGN KEY (encounter_id) REFERENCES encounters(id),
  CONSTRAINT fk_med_files_lab_order FOREIGN KEY (lab_order_id) REFERENCES lab_orders(id),
  CONSTRAINT fk_med_files_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users(id),
  INDEX idx_med_files_patient (patient_id, created_at),
  INDEX idx_med_files_encounter (encounter_id)
) ENGINE=InnoDB;

CREATE TABLE invoices (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_code VARCHAR(50) NOT NULL UNIQUE,
  appointment_id BIGINT UNSIGNED,
  patient_id BIGINT UNSIGNED NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  service_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  status ENUM('draft','issued','paid','void','refunded') NOT NULL DEFAULT 'draft',
  issued_at DATETIME,
  paid_at DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_invoices_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_invoices_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  INDEX idx_invoices_patient_status (patient_id, status),
  INDEX idx_invoices_status_created (status, created_at)
) ENGINE=InnoDB;

CREATE TABLE invoice_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_id BIGINT UNSIGNED NOT NULL,
  service_id BIGINT UNSIGNED,
  description VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_invoice_items_invoice FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  CONSTRAINT fk_invoice_items_service FOREIGN KEY (service_id) REFERENCES services(id),
  INDEX idx_invoice_items_invoice (invoice_id)
) ENGINE=InnoDB;

CREATE TABLE payments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  invoice_id BIGINT UNSIGNED NOT NULL,
  payment_code VARCHAR(50) NOT NULL UNIQUE,
  method ENUM('cash_at_clinic','online_card','bank_transfer','e_wallet','insurance') NOT NULL,
  provider VARCHAR(100),
  provider_transaction_id VARCHAR(150),
  amount DECIMAL(12,2) NOT NULL,
  status ENUM('pending','processing','success','failed','refunded','cancelled') NOT NULL DEFAULT 'pending',
  paid_at DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_invoice FOREIGN KEY (invoice_id) REFERENCES invoices(id),
  INDEX idx_payments_invoice_status (invoice_id, status),
  INDEX idx_payments_provider_txn (provider, provider_transaction_id)
) ENGINE=InnoDB;

CREATE TABLE consultation_sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id BIGINT UNSIGNED,
  patient_id BIGINT UNSIGNED NOT NULL,
  expert_id BIGINT UNSIGNED,
  doctor_id BIGINT UNSIGNED,
  session_type ENUM('chat','video_call') NOT NULL,
  status ENUM('pending','confirmed','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  scheduled_start DATETIME,
  scheduled_end DATETIME,
  started_at DATETIME,
  ended_at DATETIME,
  summary TEXT,
  rating TINYINT UNSIGNED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_consult_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  CONSTRAINT fk_consult_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_consult_expert FOREIGN KEY (expert_id) REFERENCES expert_profiles(id),
  CONSTRAINT fk_consult_doctor FOREIGN KEY (doctor_id) REFERENCES doctor_profiles(id),
  CONSTRAINT chk_consult_rating CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
  INDEX idx_consult_patient_status (patient_id, status),
  INDEX idx_consult_expert_schedule (expert_id, scheduled_start)
) ENGINE=InnoDB;

CREATE TABLE chat_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  consultation_session_id BIGINT UNSIGNED NOT NULL,
  sender_user_id BIGINT UNSIGNED NOT NULL,
  message_type ENUM('text','image','file','system') NOT NULL DEFAULT 'text',
  body TEXT,
  file_url VARCHAR(1000),
  read_at DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_chat_session FOREIGN KEY (consultation_session_id) REFERENCES consultation_sessions(id),
  CONSTRAINT fk_chat_sender FOREIGN KEY (sender_user_id) REFERENCES users(id),
  INDEX idx_chat_session_time (consultation_session_id, created_at)
) ENGINE=InnoDB;

CREATE TABLE ai_surveys (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT UNSIGNED NOT NULL,
  status ENUM('draft','completed','reviewed') NOT NULL DEFAULT 'draft',
  ai_recommendation TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ai_surveys_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  INDEX idx_ai_surveys_patient_status (patient_id, status)
) ENGINE=InnoDB;

CREATE TABLE ai_survey_answers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  survey_id BIGINT UNSIGNED NOT NULL,
  question_text VARCHAR(500) NOT NULL,
  answer_text TEXT,
  severity_score TINYINT UNSIGNED,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_ai_answers_survey FOREIGN KEY (survey_id) REFERENCES ai_surveys(id),
  INDEX idx_ai_answers_survey (survey_id)
) ENGINE=InnoDB;

CREATE TABLE health_metric_types (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  unit VARCHAR(50),
  normal_min DECIMAL(10,2),
  normal_max DECIMAL(10,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE health_metric_readings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id BIGINT UNSIGNED NOT NULL,
  metric_type_id BIGINT UNSIGNED NOT NULL,
  measured_at DATETIME NOT NULL,
  value_numeric DECIMAL(10,2),
  value_text VARCHAR(100),
  status ENUM('low','normal','high','critical','unknown') NOT NULL DEFAULT 'unknown',
  source ENUM('manual','device','clinic') NOT NULL DEFAULT 'manual',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_metric_readings_patient FOREIGN KEY (patient_id) REFERENCES patient_profiles(id),
  CONSTRAINT fk_metric_readings_type FOREIGN KEY (metric_type_id) REFERENCES health_metric_types(id),
  INDEX idx_metric_patient_type_time (patient_id, metric_type_id, measured_at)
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  notification_type ENUM('appointment','payment','message','reminder','rating','system') NOT NULL,
  title VARCHAR(200) NOT NULL,
  body VARCHAR(1000),
  related_type VARCHAR(80),
  related_id BIGINT UNSIGNED,
  read_at DATETIME,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_notifications_user_read_created (user_id, read_at, created_at)
) ENGINE=InnoDB;

CREATE TABLE audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  actor_user_id BIGINT UNSIGNED,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id BIGINT UNSIGNED,
  metadata JSON,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_audit_actor FOREIGN KEY (actor_user_id) REFERENCES users(id),
  INDEX idx_audit_entity (entity_type, entity_id),
  INDEX idx_audit_actor_time (actor_user_id, created_at)
) ENGINE=InnoDB;

INSERT INTO roles (code, name) VALUES
  ('patient', 'Patient'),
  ('doctor', 'Doctor'),
  ('expert', 'Expert'),
  ('consultant', 'Consultant'),
  ('admin', 'Administrator');
