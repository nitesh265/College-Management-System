package com.college.erp.controller;

import com.college.erp.repository.CourseRepository;
import com.college.erp.repository.StudentRepository;
import com.college.erp.repository.TeacherRepository;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/dashboard")
public class DashboardController {
  private final StudentRepository students; private final TeacherRepository teachers; private final CourseRepository courses;
  public DashboardController(StudentRepository students, TeacherRepository teachers, CourseRepository courses) { this.students = students; this.teachers = teachers; this.courses = courses; }
  @GetMapping public Map<String, Object> summary() {
    Map<String, Object> result = new LinkedHashMap<>();
    result.put("studentCount", students.count()); result.put("teacherCount", teachers.count()); result.put("courseCount", courses.count()); result.put("feesCollected", 1250000); result.put("recentStudents", students.findAll().stream().limit(5).toList());
    return result;
  }
}
