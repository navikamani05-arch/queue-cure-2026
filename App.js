import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Receptionist from "./Receptionist";
import Patient from "./Patient";
import Home from "./Home";

function ReceptionistPage() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <Receptionist />
    </div>
  );
}

function PatientPage() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <Patient />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/receptionist" element={<ReceptionistPage />} />
        <Route path="/patient" element={<PatientPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;