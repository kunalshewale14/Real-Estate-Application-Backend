import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";
import "../styles/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user || {});
      navigate("/user/home");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="login-title">Login</h1>

      {error && <p className="login-error">{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <p className="login-footer">
        Don&rsquo;t have an account?{" "}
        <Link to="/signup" className="link">
          Signup
        </Link>
      </p>
    </div>
  );
}
