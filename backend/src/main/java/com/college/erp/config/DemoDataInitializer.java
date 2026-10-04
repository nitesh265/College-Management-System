package com.college.erp.config;

import com.college.erp.model.Course;
import com.college.erp.model.Student;
import com.college.erp.model.Teacher;
import com.college.erp.repository.CourseRepository;
import com.college.erp.repository.StudentRepository;
import com.college.erp.repository.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DemoDataInitializer {
  @Bean CommandLineRunner seedData(StudentRepository students, TeacherRepository teachers, CourseRepository courses) {
    return args -> {
      if (courses.count() == 0) { courses.save(course("BTECH-IT", "B.Tech Information Technology", "4 Years")); courses.save(course("BTECH-CS", "B.Tech Computer Science", "4 Years")); courses.save(course("BCA", "Bachelor of Computer Applications", "3 Years")); }
      if (students.count() == 0) { students.save(student("Rahul Sharma", "rahul@college.edu", "B.Tech Information Technology", "2nd")); students.save(student("Priya Singh", "priya@college.edu", "Bachelor of Computer Applications", "1st")); students.save(student("Aman Kumar", "aman@college.edu", "B.Tech Computer Science", "3rd")); }
      if (teachers.count() == 0) { teachers.save(teacher("Dr. Rajesh Kumar", "rajesh@college.edu", "Information Technology", "Java Programming")); teachers.save(teacher("Prof. Neha Sharma", "neha@college.edu", "Computer Science", "Database Systems")); }
    };
  }
  private Student student(String name, String email, String course, String year) { Student s=new Student(); s.setName(name); s.setEmail(email); s.setCourse(course); s.setYear(year); return s; }
  private Teacher teacher(String name, String email, String department, String subject) { Teacher t=new Teacher(); t.setName(name); t.setEmail(email); t.setDepartment(department); t.setSubject(subject); return t; }
  private Course course(String code, String name, String duration) { Course c=new Course(); c.setCode(code); c.setName(name); c.setDuration(duration); return c; }
}
