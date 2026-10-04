import StatCard from "../../components/StatCard";
import {
  FaUserGraduate,
  FaBook,
  FaClipboardCheck
} from "react-icons/fa";

const TeacherDashboard = () => {

  return (
    <div>

      <div className="page-header">
        <h1>Teacher Dashboard</h1>
        <p>Welcome Teacher</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Students"
          value="120"
          icon={<FaUserGraduate />}
        />

        <StatCard
          title="Courses"
          value="4"
          icon={<FaBook />}
        />

        <StatCard
          title="Attendance"
          value="87%"
          icon={<FaClipboardCheck />}
        />

      </div>

      <div className="card">

        <h2>Today's Classes</h2>

        <table>

          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Java</td>
              <td>B.Tech IT - 2nd Year</td>
              <td>10:00 AM</td>
            </tr>

            <tr>
              <td>DSA</td>
              <td>B.Tech IT - 2nd Year</td>
              <td>12:00 PM</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TeacherDashboard;