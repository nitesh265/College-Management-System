package com.college.erp.controller;

import com.college.erp.model.Course;
import com.college.erp.repository.CourseRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
  private final CourseRepository courses;
  public CourseController(CourseRepository courses) { this.courses = courses; }
  @GetMapping public List<Course> all() { return courses.findAll(); }
  @PostMapping @ResponseStatus(HttpStatus.CREATED) public Course create(@RequestBody Course course) { return courses.save(course); }
  @PutMapping("/{id}") public Course update(@PathVariable Long id, @RequestBody Course input) {
    Course course = courses.findById(id).orElseThrow(() -> new IllegalArgumentException("Course not found"));
    course.setCode(input.getCode()); course.setName(input.getName()); course.setDuration(input.getDuration()); return courses.save(course);
  }
  @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { courses.deleteById(id); }
}
