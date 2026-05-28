package com.smarthealthcare.security;

import com.smarthealthcare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository users;

  @Override
  public UserDetails loadUserByUsername(String email) {
    var user = users.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(email));
    return User.withUsername(user.getEmail())
        .password(user.getPasswordHash())
        .authorities(user.getRoles().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.getCode().toUpperCase())).toList())
        .build();
  }
}
