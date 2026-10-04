import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaMoneyBill
} from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/api";

import StatCard from "../../components/StatCard";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  useEffect(() => { api.get("/dashboard").then(({ data }) => setSummary(data)).catch(() => {}); }, []);
  const recentStudents = summary?.recentStudents || [
    { id: 1, name: "Rahul Sharma", course: "B.Tech IT", year: "2nd Year" },
    { id: 2, name: "Priya Singh", course: "BCA", year: "1st Year" },
    { id: 3, name: "Aman Kumar", course: "B.Tech CS", year: "3rd Year" }
  ];

  return (
    <div>

      <div className="page-header">
        <div><span className="eyebrow">OVERVIEW</span><h1>Good morning, Administrator</h1><p>Here’s what’s happening across campus today.</p></div>
        <button className="secondary-btn">Download report</button>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Students"
          value={summary?.studentCount?.toLocaleString() || "1,250"}
          icon={<FaUserGraduate />}
        />

        <StatCard
          title="Total Teachers"
          value={summary?.teacherCount?.toLocaleString() || "85"}
          icon={<FaChalkboardTeacher />}
        />

        <StatCard
          title="Total Courses"
          value={summary?.courseCount?.toLocaleString() || "42"}
          icon={<FaBook />}
        />

        <StatCard
          title="Fees Collected"
          value="₹12.5L"
          icon={<FaMoneyBill />}
        />

      </div>

      <div className="dashboard-grid">

        <div className="card">
          <h2>Recent Students</h2>

          <table>

            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
              </tr>
            </thead>

            <tbody>
              {recentStudents.map((student) => (
                <tr key={student.id}><td>{student.name}</td><td>{student.course}</td><td>{student.year}</td></tr>
              ))}
            </tbody>

          </table>
        </div>

        <div className="card">

          <h2>Notice Board</h2>

          <div className="notice">
            <strong>Exam Form</strong>
            <p>Last date for exam form submission.</p>
          </div>

          <div className="notice">
            <strong>Holiday</strong>
            <p>College will remain closed on Friday.</p>
          </div>

          <div className="notice">
            <strong>Event</strong>
            <p>Annual college event next month.</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
