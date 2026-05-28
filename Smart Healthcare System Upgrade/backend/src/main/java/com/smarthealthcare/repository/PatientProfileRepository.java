package com.smarthealthcare.repository;

import com.smarthealthcare.entity.PatientProfile;
import java.util.Optional;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface PatientProfileRepository extends JpaRepository<PatientProfile, Long> {
  @Query("select p from PatientProfile p join p.user u where :q is null or lower(u.fullName) like lower(concat('%', :q, '%')) or lower(p.patientCode) like lower(concat('%', :q, '%'))")
  Page<PatientProfile> search(@Param("q") String q, Pageable pageable);

  Optional<PatientProfile> findByUserId(Long userId);
}
