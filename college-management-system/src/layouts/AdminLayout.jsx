import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const AdminLayout = () => {

  return (
    <div className="app-container">

      <Sidebar role="admin" />

      <div className="main-section">

        <Navbar />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;