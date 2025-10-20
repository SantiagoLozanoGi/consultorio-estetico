"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import GestionCitas from "./components/GestionCitas";
import GestionProcedimientos from "./components/GestionProcedimientos";
import GestionUsuarios from "./components/GestionUsuarios";

export default function PanelAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [section, setSection] = useState("dashboard");

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") router.push("/");
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh" }}>
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2"
          style={{
            backgroundColor: "#E8E1D4",
            minHeight: "100vh",
            padding: "2rem 1rem",
            boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h4
            className="fw-bold mb-4 text-center"
            style={{ color: "#4E3B2B", fontFamily: "'Playfair Display', serif" }}
          >
            Panel Admin
          </h4>
          {[
            { key: "dashboard", label: "📊 Dashboard" },
            { key: "citas", label: "📅 Gestión de Citas" },
            { key: "procedimientos", label: "💉 Procedimientos" },
            { key: "usuarios", label: "👥 Usuarios" },
          ].map((item) => (
            <button
              key={item.key}
              className={`btn w-100 text-start fw-semibold mb-2 ${
                section === item.key ? "btn-dark text-white" : "btn-outline-dark"
              }`}
              onClick={() => setSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Contenido dinámico */}
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-5 py-4">
          {section === "dashboard" && <Dashboard />}
          {section === "citas" && <GestionCitas />}
          {section === "procedimientos" && <GestionProcedimientos />}
          {section === "usuarios" && <GestionUsuarios />}
        </div>
      </div>
    </div>
  );
}
