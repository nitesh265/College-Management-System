package com.college.erp.controller;

import com.college.erp.model.Student;
import com.college.erp.repository.StudentRepository;
import com.college.erp.service.SessionAuthService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/students")
public class StudentController {
  private final StudentRepository students;
  private final SessionAuthService auth;
  public StudentController(StudentRepository students, SessionAuthService auth) { this.students = students; this.auth = auth; }
  @GetMapping public List<Student> all() { return students.findAll(); }
  @GetMapping("/{id}")
  public Student getById(@PathVariable Long id) {
    return students.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
  }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Student create(@RequestHeader(value = "Authorization", required = false) String authorization, @Valid @RequestBody Student student) { auth.requireAdmin(authorization); student.setPassword(auth.hashPassword(student.getPassword())); return students.save(student); }
  @PutMapping("/{id}") public Student update(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id, @Valid @RequestBody Student input) { auth.requireAdmin(authorization);
    Student student = students.findById(id).orElseThrow(() -> new IllegalArgumentException("Student not found"));
    student.setName(input.getName()); student.setEmail(input.getEmail()); student.setCourse(input.getCourse()); student.setYear(input.getYear()); student.setStatus(input.getStatus());
    return students.save(student);
  }
  @PutMapping("/{id}/password") @ResponseStatus(HttpStatus.NO_CONTENT)
  public void setPassword(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id, @RequestBody java.util.Map<String, String> request) {
    auth.requireAdmin(authorization);
    Student student = students.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    student.setPassword(auth.hashPassword(request.get("password")));
    students.save(student);
  }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@RequestHeader(value = "Authorization", required = false) String authorization, @PathVariable Long id) { auth.requireAdmin(authorization); students.deleteById(id); }
}
