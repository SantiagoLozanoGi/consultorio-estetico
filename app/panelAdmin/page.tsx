"use client";

import { useState } from "react";
import Dashboard from "./components/Dashboard";
import GestionCitas from "./components/GestionCitas";
import GestionProcedimientos from "./components/GestionProcedimientos";
import GestionUsuarios from "./components/GestionUsuarios";

export default function PanelAdminVisible() {
  const [section, setSection] = useState("dashboard");

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#FAF9F7",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div className="row">
        {/* SIDEBAR */}
        <div
          className="col-md-3 col-lg-2 p-3 p-md-4"
          style={{
            backgroundColor: "#E8E1D4",
            minHeight: "100vh",
            boxShadow: "2px 0 10px rgba(0,0,0,0.08)",
            position: "sticky",
            top: 0,
          }}
        >
          <h4
            className="fw-bold mb-4 text-center"
            style={{
              color: "#4E3B2B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Panel Admin
          </h4>

          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "citas", label: "Gestión de Citas" },
            { key: "procedimientos", label: "Procedimientos" },
            { key: "usuarios", label: "Usuarios" },
          ].map((item) => (
            <button
              key={item.key}
              className={`btn w-100 text-start fw-semibold mb-2 ${
                section === item.key
                  ? "btn-dark text-white"
                  : "btn-outline-dark"
              }`}
              onClick={() => setSection(item.key)}
              style={{
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div
          className="col-md-9 col-lg-10 px-md-5 py-4"
          style={{
            backgroundColor: "#FFFDF9",
          }}
        >
          {section === "dashboard" && <Dashboard />}
          {section === "citas" && <GestionCitas />}
          {section === "procedimientos" && <GestionProcedimientos />}
          {section === "usuarios" && <GestionUsuarios />}
        </div>
      </div>

      {/* RESPONSIVE SIDEBAR */}
      <style jsx>{`
        @media (max-width: 992px) {
          .col-md-3 {
            position: static !important;
            width: 100% !important;
            box-shadow: none !important;
            min-height: auto !important;
          }

          .col-md-3 h4 {
            font-size: 1.3rem;
          }

          .col-md-9 {
            padding: 1.5rem !important;
          }

          button.btn {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 576px) {
          .col-md-3 h4 {
            font-size: 1.1rem;
          }

          .col-md-9 {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
