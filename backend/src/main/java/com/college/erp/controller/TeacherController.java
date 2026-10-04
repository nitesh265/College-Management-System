package com.college.erp.controller;

import com.college.erp.model.Teacher;
import com.college.erp.repository.TeacherRepository;
import com.college.erp.service.SessionAuthService;
import java.util.List;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
  private final TeacherRepository teachers;
  private final SessionAuthService auth;
  public TeacherController(TeacherRepository teachers, SessionAuthService auth) { this.teachers = teachers; this.auth = auth; }
  @GetMapping public List<Teacher> all() { return teachers.findAll(); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Teacher create(@RequestHeader(value = "Authorization", required = false) String authorization, @RequestBody Teacher teacher) { auth.requireAdmin(authorization); teacher.setPassword(auth.hashPassword(teacher.getPassword())); return teachers.save(teacher); }
  @PutMapping("/{id}") public Teacher update(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id, @RequestBody Teacher input) { auth.requireAdmin(authorization);
    Teacher teacher = teachers.findById(id).orElseThrow(() -> new IllegalArgumentException("Teacher not found"));
    teacher.setName(input.getName()); teacher.setEmail(input.getEmail()); if (input.getPassword() != null && !input.getPassword().isBlank()) teacher.setPassword(auth.hashPassword(input.getPassword())); teacher.setDepartment(input.getDepartment()); teacher.setSubject(input.getSubject());
    return teachers.save(teacher);
  }
  @PutMapping("/{id}/password") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void setPassword(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
    auth.requireAdmin(authorization);
    Teacher teacher = teachers.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Teacher not found"));
    teacher.setPassword(auth.hashPassword(request.get("password")));
    teachers.save(teacher);
  }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id) { auth.requireAdmin(authorization); teachers.deleteById(id); }
}
