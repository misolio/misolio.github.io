import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function UserMenu() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!currentUser || location.pathname !== "/login") return null;

  return (
    <div className="user-menu">
      <span>👤 {currentUser.email}</span>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
}

export default UserMenu;
