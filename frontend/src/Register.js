import { useState } from "react";
import { Link } from "react-router-dom";
import API from "./api";

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const selectRole = (role) => {
    setForm({ ...form, role });
  };

  // ✅ Register + Auto Login + Redirect
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register
      await API.post("/auth/register", form);

      // Auto login
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // Redirect based on role
      if (role === "client") {
        window.location.href = "/client-dashboard";
      } else {
        window.location.href = "/freelancer-dashboard";
      }

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">

      <div className="bg-[#020617] text-white p-10 rounded-2xl w-[440px] border border-gray-700 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          FreelanceHub
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Create your account
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            autoComplete="off"
            onChange={handleChange}
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg"
            required
          />

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

          {/* ROLE TOGGLE */}
          <div>
            <p className="text-gray-400 mb-2">Join as</p>

            <div className="flex bg-[#0f172a] p-1 rounded-lg">

              <button
                type="button"
                onClick={() => selectRole("freelancer")}
                className={`flex-1 p-3 rounded-lg transition ${
                  form.role === "freelancer"
                    ? "bg-blue-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Freelancer
              </button>

              <button
                type="button"
                onClick={() => selectRole("client")}
                className={`flex-1 p-3 rounded-lg transition ${
                  form.role === "client"
                    ? "bg-purple-600"
                    : "hover:bg-gray-800"
                }`}
              >
                Client
              </button>

            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg font-semibold hover:scale-105 transition">
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          <Link to="/" className="text-blue-400 ml-1">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}