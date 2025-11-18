import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import coldImg from "../img/Logopropio.jpg";
import "./HeaderAdmin.css";

function HeaderUser() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      {/* LOGO */}
      <div className="admin-logo">
        <img src={coldImg} alt="logo" />
        <span>PaCo</span>
      </div>

      {/* BIENVENIDA + MENÚ */}
      <div className="admin-right">
        <span className="admin-user">
          Bienvenido, {user?.role || "Usuario"}
        </span>

        {/* Botón del menú */}
        <div className="admin-dropdown">
          <button className="admin-dropdown-btn" onClick={() => setOpen(!open)}>
            Menú Usuario ▾
          </button>
          {/* MENÚ VERTICAL */}
          <div className={`admin-dropdown-content ${open ? "show" : ""}`}>
        
          

            <button className="cerrar" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderUser;
