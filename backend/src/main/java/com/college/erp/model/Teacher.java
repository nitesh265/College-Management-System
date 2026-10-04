package com.college.erp.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity @Table(name = "teachers")
public class Teacher {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name; private String email; private String department; private String subject;
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) private String password;
  public Long getId() { return id; } public String getName() { return name; } public void setName(String name) { this.name = name; }
  public String getEmail() { return email; } public void setEmail(String email) { this.email = email; }
  public String getPassword() { return password; } public void setPassword(String password) { this.password = password; }
  public String getDepartment() { return department; } public void setDepartment(String department) { this.department = department; }
  public String getSubject() { return subject; } public void setSubject(String subject) { this.subject = subject; }
}
