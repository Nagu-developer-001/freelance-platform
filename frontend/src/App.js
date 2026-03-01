import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.js";
import Register from "./Register.js";
import ClientDashboard from "./ClientDashboard";
import FreelancerDashboard from "./FreelancerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;