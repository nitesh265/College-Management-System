import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaClipboardCheck,
  FaMoneyBill,
  FaBullhorn
} from "react-icons/fa";

const Sidebar = ({ role }) => {

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <FaUserGraduate />
    },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: <FaChalkboardTeacher />
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: <FaBook />
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: <FaClipboardCheck />
    },
    {
      name: "Fees",
      path: "/admin/fees",
      icon: <FaMoneyBill />
    },
    {
      name: "Notices",
      path: "/admin/notices",
      icon: <FaBullhorn />
    }
  ];

  const teacherLinks = [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
      icon: <FaHome />
    },
    {
      name: "Attendance",
      path: "/teacher/attendance",
      icon: <FaClipboardCheck />
    },
    {
      name: "Courses",
      path: "/teacher/courses",
      icon: <FaBook />
    }
  ];

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <FaHome />
    },
    {
      name: "Attendance",
      path: "/student/attendance",
      icon: <FaClipboardCheck />
    },
    {
      name: "Courses",
      path: "/student/courses",
      icon: <FaBook />
    },
    {
      name: "Fees",
      path: "/student/fees",
      icon: <FaMoneyBill />
    }
  ];

  let links = [];

  if (role === "admin") {
    links = adminLinks;
  } else if (role === "teacher") {
    links = teacherLinks;
  } else {
    links = studentLinks;
  }

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="brand-mark">C</div><h2>Campus<span>One</span></h2>
      </div>

      <span className="nav-caption">MENU</span><nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
