import { useEffect, useState } from "react";
import api from "../../services/api";
const emptyTeacher = { name: "", email: "", password: "", subject: "", department: "" };
export default function Teachers() {
  const [teachers, setTeachers] = useState([]), [form, setForm] = useState(emptyTeacher);
  const [show, setShow] = useState(false), [loading, setLoading] = useState(true), [error, setError] = useState("");
  const load = () => api.get("/teachers").then(({ data }) => setTeachers(data));
  useEffect(() => { load().catch(() => setError("Could not load teachers. Ensure the API is running.")).finally(() => setLoading(false)); }, []);
  const save = async (e) => { e.preventDefault(); setError(""); try { await api.post("/teachers", form); await load(); setForm(emptyTeacher); setShow(false); } catch (err) { setError(err.response?.data?.message || "Only an administrator can add teachers."); } };
  const remove = async (id) => { if (!window.confirm("Delete this teacher?")) return; try { await api.delete(`/teachers/${id}`); setTeachers((all) => all.filter((t) => t.id !== id)); } catch (err) { setError(err.response?.data?.message || "Teacher could not be deleted."); } };
  const setPassword = async (teacher) => { const password = window.prompt(`Set a login password for ${teacher.name}:`); if (!password) return; try { await api.put(`/teachers/${teacher.id}/password`, { password }); setError(""); window.alert("Password updated. Share it securely with the teacher."); } catch (err) { setError(err.response?.data?.message || "Password could not be updated."); } };
  return <div><div className="page-header"><div><h1>Teachers</h1><p>Manage teaching staff</p></div><button className="primary-btn" onClick={() => setShow(true)}>+ Add Teacher</button></div>
    {error && <p className="form-error page-error">{error}</p>}
    {show && <form className="card data-form" onSubmit={save}><h2>Add teacher</h2><div className="form-grid">{[["name", "Full name", "text"], ["email", "Email", "email"], ["password", "Login password", "password"], ["subject", "Subject", "text"], ["department", "Department", "text"]].map(([n, l, t]) => <label key={n}>{l}<input type={t} name={n} value={form[n]} onChange={(e) => setForm({ ...form, [n]: e.target.value })} required /></label>)}</div><div className="form-actions"><button type="button" className="secondary-btn" onClick={() => setShow(false)}>Cancel</button><button className="primary-btn">Save teacher</button></div></form>}
    <div className="card"><table><thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Subject</th><th>Department</th><th>Action</th></tr></thead><tbody>{teachers.map((t) => <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.email}</td><td>{t.subject}</td><td>{t.department}</td><td><button className="secondary-btn" onClick={() => setPassword(t)}>Set password</button> <button className="delete-btn" onClick={() => remove(t.id)}>Delete</button></td></tr>)}{!loading && !teachers.length && <tr><td colSpan="6">No teachers have been added yet.</td></tr>}</tbody></table>{loading && <p className="table-note">Syncing teachers…</p>}</div>
  </div>;
}
