package com.college.erp.model;

import jakarta.persistence.*;

@Entity @Table(name = "courses")
public class Course {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(unique = true) private String code; private String name; private String duration;
  public Long getId() { return id; } public String getCode() { return code; } public void setCode(String code) { this.code = code; }
  public String getName() { return name; } public void setName(String name) { this.name = name; }
  public String getDuration() { return duration; } public void setDuration(String duration) { this.duration = duration; }
}
