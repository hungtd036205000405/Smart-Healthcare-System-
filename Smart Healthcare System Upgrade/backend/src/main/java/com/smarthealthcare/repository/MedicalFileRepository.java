package com.smarthealthcare.repository;

import com.smarthealthcare.entity.MedicalFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalFileRepository extends JpaRepository<MedicalFile, Long> {}
