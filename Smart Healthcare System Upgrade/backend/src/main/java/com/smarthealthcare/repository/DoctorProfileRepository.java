package com.smarthealthcare.repository;

import com.smarthealthcare.entity.DoctorProfile;
import java.util.Optional;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {
  @Query("select d from DoctorProfile d join d.user u where :q is null or lower(u.fullName) like lower(concat('%', :q, '%')) or lower(d.licenseNo) like lower(concat('%', :q, '%'))")
  Page<DoctorProfile> search(@Param("q") String q, Pageable pageable);

  Optional<DoctorProfile> findByUserId(Long userId);
}
