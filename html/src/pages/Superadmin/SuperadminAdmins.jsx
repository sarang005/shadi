import { useEffect, useState } from "react";
import * as superadminService from "@/features/superadmin/superadminService";
import { getApiErrorMessage } from "@/utils/apiUtils";
import "../Admin/AdminPages.scss";
import ShadiSampannaLoader from "@/components/layouts/Loader/ShadiSampannaLoader";

const SuperadminAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const load = async () => {
    try {
      setLoading(true);
      const data = await superadminService.fetchAdmins({ limit: 20 });
      setAdmins(data.admins);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await superadminService.createAdmin(form);
      setForm({ name: "", email: "", password: "", role: "admin" });
      load();
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="admin-page">
      <header className="topbar">
        <h1>Manage Admins</h1>
      </header>
      <div className="page">
        <form className="admin-form" onSubmit={handleCreate}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button type="submit">Create Account</button>
        </form>
        {error && <p className="admin-error">{error}</p>}
        {loading && (
          <p className="admin-muted">
            <ShadiSampannaLoader />
          </p>
        )}
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a._id || a.id}>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperadminAdmins;
