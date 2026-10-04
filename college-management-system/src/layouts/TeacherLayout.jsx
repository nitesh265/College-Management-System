import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const TeacherLayout = () => {

  return (
    <div className="app-container">

      <Sidebar role="teacher" />

      <div className="main-section">

        <Navbar />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default TeacherLayout;