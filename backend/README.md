# College ERP API

Requires Java 17+, Maven, and MySQL. The app creates the `college_erp` database when the MySQL user has permission.

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
mvn spring-boot:run
```

The React app calls `http://localhost:8080/api`. Available endpoints include `/api/auth/login`, `/api/dashboard`, and CRUD `/api/students` and `/api/teachers`.

## Accounts and permissions

Only an authenticated administrator can create, update, or delete students and teachers. The default local administrator is `admin@college.edu` with password `password`; change it using `ADMIN_EMAIL` and `ADMIN_PASSWORD` before deployment. Seeded teachers and students can sign in with their listed email and the local `MEMBER_PASSWORD` (default: `password`).

Students and teachers created from the administrator pages are stored through JPA in the configured MySQL database.
