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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Account created successfully");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[450px] h-[450px] bg-purple-500 blur-[140px] opacity-20 rounded-full top-10 right-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500 blur-[120px] opacity-20 rounded-full bottom-10 left-10"></div>

      <div className="bg-[#020617] text-white p-10 rounded-2xl shadow-2xl w-[440px] border border-gray-700">

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
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            onChange={handleChange}
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg focus:border-blue-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChange}
            className="w-full p-3 bg-[#020617] border border-gray-600 rounded-lg focus:border-purple-500 outline-none"
            required
          />

          {/* Role Selection */}
          <div>
            <p className="text-gray-400 mb-2">Join as</p>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, role: "freelancer" })
                }
                className={`flex-1 p-3 rounded-lg border transition ${
                  form.role === "freelancer"
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-600 hover:bg-gray-800"
                }`}
              >
                Freelancer
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({ ...form, role: "client" })
                }
                className={`flex-1 p-3 rounded-lg border transition ${
                  form.role === "client"
                    ? "bg-purple-600 border-purple-600"
                    : "border-gray-600 hover:bg-gray-800"
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