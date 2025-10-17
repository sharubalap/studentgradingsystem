import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {token && (
        <button onClick={handleLogout} style={{ margin: "10px" }}>
          Logout
        </button>
      )}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/student"
          element={role === "student" ? <StudentDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/teacher"
          element={role === "teacher" ? <TeacherDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;