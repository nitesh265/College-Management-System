package com.college.erp.controller;

import com.college.erp.service.SessionAuthService;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final SessionAuthService auth;
  public AuthController(SessionAuthService auth) { this.auth = auth; }
  @PostMapping("/login")
  public Map<String, String> login(@RequestBody Map<String, String> request) {
    String email = request.getOrDefault("email", "");
    SessionAuthService.SessionUser user = auth.login(email, request.getOrDefault("password", ""), request.get("role"));
    return Map.of("token", user.token(), "name", user.name(), "email", user.email(), "role", user.role());
  }
}
