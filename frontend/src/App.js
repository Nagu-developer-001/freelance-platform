import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.js";
import Register from "./Register.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;