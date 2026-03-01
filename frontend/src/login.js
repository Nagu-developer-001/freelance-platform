import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // Role-based redirect
      if (role === "client") {
        window.location.href = "/client-dashboard";
      } else {
        window.location.href = "/freelancer-dashboard";
      }

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">

      <div className="bg-[#020617] text-white p-10 rounded-2xl w-[420px] border border-gray-700 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          FreelanceHub
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Welcome back
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="off"
            onChange={handleChange}
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChange}
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg"
            required
          />

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg font-semibold">
            Sign In
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          New here?
          <Link to="/register" className="text-blue-400 ml-1">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}