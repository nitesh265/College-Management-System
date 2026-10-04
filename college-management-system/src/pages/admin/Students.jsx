import { useEffect, useState } from "react";
import api from "../../services/api";

const emptyStudent = { name: "", email: "", password: "", course: "", year: "", status: "Active" };
export default function Students() {
  const [students, setStudents] = useState([]), [form, setForm] = useState(emptyStudent);
  const [show, setShow] = useState(false), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const load = () => api.get("/students").then(({ data }) => setStudents(data));
  useEffect(() => { load().catch(() => setError("Could not load students. Ensure the API is running.")).finally(() => setLoading(false)); }, []);
  const save = async (e) => { e.preventDefault(); setError(""); try { await api.post("/students", form); await load(); setForm(emptyStudent); setShow(false); } catch (err) { setError(err.response?.data?.message || "Only an administrator can add students."); } };
  const remove = async (id) => { if (!window.confirm("Delete this student?")) return; try { await api.delete(`/students/${id}`); setStudents((all) => all.filter((s) => s.id !== id)); } catch (err) { setError(err.response?.data?.message || "Student could not be deleted."); } };
  const setPassword = async (student) => { const password = window.prompt(`Set a login password for ${student.name}:`); if (!password) return; try { await api.put(`/students/${student.id}/password`, { password }); setError(""); window.alert("Password updated. Share it securely with the student."); } catch (err) { setError(err.response?.data?.message || "Password could not be updated."); } };
  return <div><div className="page-header"><div><h1>Students</h1><p>Manage college students</p></div><button className="primary-btn" onClick={() => setShow(true)}>+ Add Student</button></div>
    {error && <p className="form-error page-error">{error}</p>}
    {show && <form className="card data-form" onSubmit={save}><h2>Add student</h2><div className="form-grid">{[["name", "Full name", "text"], ["email", "Email", "email"], ["password", "Login password", "password"], ["course", "Course", "text"], ["year", "Year", "text"]].map(([n, l, t]) => <label key={n}>{l}<input type={t} name={n} value={form[n]} onChange={(e) => setForm({ ...form, [n]: e.target.value })} required /></label>)}</div><div className="form-actions"><button type="button" className="secondary-btn" onClick={() => setShow(false)}>Cancel</button><button className="primary-btn">Save student</button></div></form>}
    <div className="card"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Year</th><th>Action</th></tr></thead><tbody>{students.map((s) => <tr key={s.id}><td>{s.id}</td><td>{s.name}</td><td>{s.email}</td><td>{s.course}</td><td>{s.year}</td><td><button className="secondary-btn" onClick={() => setPassword(s)}>Set password</button> <button className="delete-btn" onClick={() => remove(s.id)}>Delete</button></td></tr>)}{!loading && !students.length && <tr><td colSpan="6">No students have been added yet.</td></tr>}</tbody></table>{loading && <p className="table-note">Syncing students…</p>}</div>
  </div>;
}
