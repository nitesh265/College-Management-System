package com.college.erp.service;

import com.college.erp.repository.StudentRepository;
import com.college.erp.repository.TeacherRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Base64;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCrypt;

/** Issues and validates signed HS256 JSON Web Tokens. */
@Service
public class SessionAuthService {
  private static final long TOKEN_LIFETIME_SECONDS = 8 * 60 * 60;
  private static final String JWT_HEADER = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";
  private final StudentRepository students;
  private final TeacherRepository teachers;
  private final ObjectMapper objectMapper;
  private final String adminEmail;
  private final String adminPassword;
  private final String memberPassword;
  private final String jwtSecret;

  public SessionAuthService(StudentRepository students, TeacherRepository teachers,
      ObjectMapper objectMapper,
      @Value("${college.admin.email:admin@college.edu}") String adminEmail,
      @Value("${college.admin.password:password}") String adminPassword,
      @Value("${college.member.password:password}") String memberPassword,
      @Value("${college.jwt.secret:local-development-secret-change-before-deployment-1234567890}") String jwtSecret) {
    this.students = students; this.teachers = teachers; this.objectMapper = objectMapper;
    this.adminEmail = adminEmail; this.adminPassword = adminPassword; this.memberPassword = memberPassword;
    if (jwtSecret.getBytes(StandardCharsets.UTF_8).length < 32)
      throw new IllegalArgumentException("JWT secret must contain at least 32 bytes");
    this.jwtSecret = jwtSecret;
  }

  public SessionUser login(String email, String password, String requestedRole) {
    final String normalizedEmail = email == null ? "" : email.trim();
    final String suppliedPassword = password == null ? "" : password;
    String role = requestedRole == null ? "student" : requestedRole.toLowerCase();
    boolean valid = switch (role) {
      case "admin" -> adminEmail.equalsIgnoreCase(normalizedEmail) && adminPassword.equals(suppliedPassword);
      case "teacher" -> teachers.findAll().stream().filter(t -> normalizedEmail.equalsIgnoreCase(t.getEmail()))
          .anyMatch(t -> matches(t.getPassword(), suppliedPassword));
      case "student" -> students.findAll().stream().filter(s -> normalizedEmail.equalsIgnoreCase(s.getEmail()))
          .anyMatch(s -> matches(s.getPassword(), suppliedPassword));
      default -> false;
    };
    if (!valid) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email, password, or role");
    String name = switch (role) {
      case "admin" -> "Administrator";
      case "teacher" -> teachers.findAll().stream().filter(t -> normalizedEmail.equalsIgnoreCase(t.getEmail())).findFirst().map(t -> t.getName()).orElse("Faculty Member");
      default -> students.findAll().stream().filter(s -> normalizedEmail.equalsIgnoreCase(s.getEmail())).findFirst().map(s -> s.getName()).orElse("Student");
    };
    long issuedAt = System.currentTimeMillis() / 1000;
    Map<String, Object> claims = new HashMap<>();
    claims.put("sub", normalizedEmail);
    claims.put("email", normalizedEmail);
    claims.put("name", name);
    claims.put("role", role);
    claims.put("iat", issuedAt);
    claims.put("exp", issuedAt + TOKEN_LIFETIME_SECONDS);
    String token = createToken(claims);
    SessionUser user = new SessionUser(token, name, normalizedEmail, role);
    return user;
  }

  private String createToken(Map<String, Object> claims) {
    try {
      Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
      String header = encoder.encodeToString(JWT_HEADER.getBytes(StandardCharsets.UTF_8));
      String payload = encoder.encodeToString(objectMapper.writeValueAsBytes(claims));
      String signingInput = header + "." + payload;
      return signingInput + "." + encoder.encodeToString(sign(signingInput));
    } catch (Exception exception) {
      throw new IllegalStateException("Could not create authentication token", exception);
    }
  }

  private byte[] sign(String signingInput) throws Exception {
    Mac mac = Mac.getInstance("HmacSHA256");
    mac.init(new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
    return mac.doFinal(signingInput.getBytes(StandardCharsets.UTF_8));
  }

  private boolean matches(String stored, String supplied) {
    return stored == null ? memberPassword.equals(supplied) : BCrypt.checkpw(supplied, stored);
  }

  public String hashPassword(String password) {
    if (password == null || password.isBlank())
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
    return BCrypt.hashpw(password, BCrypt.gensalt());
  }

  public void requireAdmin(String authorization) {
    if (authorization == null || !authorization.startsWith("Bearer "))
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Sign in is required");
    Map<String, Object> claims = validateToken(authorization.substring(7));
    if (!"admin".equals(claims.get("role"))) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only administrators can manage students and teachers");
  }

  private Map<String, Object> validateToken(String token) {
    try {
      String[] parts = token.split("\\.", -1);
      if (parts.length != 3 || !"HS256".equals(objectMapper.readTree(Base64.getUrlDecoder().decode(parts[0])).path("alg").asText()))
        throw new IllegalArgumentException("Malformed JWT");
      String signingInput = parts[0] + "." + parts[1];
      byte[] presentedSignature = Base64.getUrlDecoder().decode(parts[2]);
      if (!MessageDigest.isEqual(sign(signingInput), presentedSignature))
        throw new IllegalArgumentException("Invalid JWT signature");
      Map<String, Object> claims = objectMapper.readValue(Base64.getUrlDecoder().decode(parts[1]), new TypeReference<Map<String, Object>>() { });
      Object expiration = claims.get("exp");
      if (!(expiration instanceof Number) || ((Number) expiration).longValue() <= System.currentTimeMillis() / 1000)
        throw new IllegalArgumentException("Expired JWT");
      return claims;
    } catch (Exception exception) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Your token is invalid or has expired");
    }
  }

  public record SessionUser(String token, String name, String email, String role) { }
}
