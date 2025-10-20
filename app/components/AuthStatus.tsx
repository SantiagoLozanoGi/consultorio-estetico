"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function AuthStatus() {
  const [user, setUser] = useState<{ nombre: string; email: string } | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!user) {
    return (
      <ul className="navbar-nav flex-row">
        <li className="nav-item me-3">
          <Link className="btn btn-light text-primary fw-semibold" href="/login">
            <i className="fas fa-sign-in-alt me-1"></i>Iniciar Sesión
          </Link>
        </li>
        <li className="nav-item">
          <Link className="btn btn-warning text-dark fw-semibold" href="/register">
            <i className="fas fa-user-plus me-1"></i>Registrarse
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <span className="text-white small">
        <i className="fas fa-user-circle me-1"></i>
        {user.nombre.split(" ")[0]}
      </span>
      <button
        className="btn btn-outline-light btn-sm"
        onClick={() => {
          logoutUser();
          // actualizar estado en este tab
          window.dispatchEvent(new StorageEvent("storage"));
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
