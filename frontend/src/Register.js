import { useState } from "react";
import API from "./api";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);

    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} placeholder="Password" />
      <select name="role" onChange={handleChange}>
        <option value="client">Client</option>
        <option value="freelancer">Freelancer</option>
      </select>
      <button>Register</button>
    </form>
  );
}

export default Register;