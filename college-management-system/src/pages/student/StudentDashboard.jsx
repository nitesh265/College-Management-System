import StatCard from "../../components/StatCard";
import {
  FaBook,
  FaClipboardCheck,
  FaMoneyBill
} from "react-icons/fa";

const StudentDashboard = () => {

  return (
    <div>

      <div className="page-header">

        <h1>Student Dashboard</h1>

        <p>
          Welcome back, Student
        </p>

      </div>

      <div className="stats-grid">

        <StatCard
          title="My Courses"
          value="6"
          icon={<FaBook />}
        />

        <StatCard
          title="Attendance"
          value="89%"
          icon={<FaClipboardCheck />}
        />

        <StatCard
          title="Fees Paid"
          value="₹75,000"
          icon={<FaMoneyBill />}
        />

      </div>

      <div className="card">

        <h2>Recent Notices</h2>

        <div className="notice">
          <strong>Semester Examination</strong>
          <p>
            Semester examination schedule has been published.
          </p>
        </div>

        <div className="notice">
          <strong>Assignment</strong>
          <p>
            Submit Java assignment before Friday.
          </p>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;