package com.college.erp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "students")
public class Student {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @NotBlank private String name;
  @Email @Column(unique = true) private String email;
  @NotBlank private String course;
  @NotBlank private String year;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @NotBlank(groups = Create.class) private String password;
  private String status = "Active";
  public interface Create { }
  public Long getId() { return id; } public void setId(Long id) { this.id = id; }
  public String getName() { return name; } public void setName(String name) { this.name = name; }
  public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
  public String getCourse() { return course; } public void setCourse(String course) { this.course = course; }
  public String getYear() { return year; } public void setYear(String year) { this.year = year; }
  public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
  public String getStatus() { return status; } public void setStatus(String status) { this.status = status; }
}
