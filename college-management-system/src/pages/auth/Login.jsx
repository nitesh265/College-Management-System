import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@college.edu");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    try {
      const { data: user } = await api.post("/auth/login", { email, password, role });
      login(user);

    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }
    } catch (err) {
      setError(err.response?.status === 401
        ? "Incorrect email, password, or account role. Check the credentials provided by your administrator."
        : err.response?.data?.message || "Unable to reach the server. Start the Spring Boot API and try again.");
    }
    finally { setLoading(false); }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="brand-mark">CE</div>
        <h1>Welcome back</h1>

        <p>Sign in to your College ERP account.</p>

        <form onSubmit={handleLogin}>

          <label>Email address</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Continue as</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Administrator</option>
            <option value="teacher">Faculty member</option>
            <option value="student">Student</option>
          </select>

          {error && <p className="form-error">{error}</p>}
          <button className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in to dashboard"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
