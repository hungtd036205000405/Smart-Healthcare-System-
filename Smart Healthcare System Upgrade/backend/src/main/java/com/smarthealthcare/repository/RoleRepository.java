package com.smarthealthcare.repository;

import com.smarthealthcare.entity.Role;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByCode(String code);
  boolean existsByCode(String code);
}
