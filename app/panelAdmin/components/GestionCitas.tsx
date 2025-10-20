"use client";

import { useEffect, useState } from "react";

type Cita = {
  id: number;
  paciente: string;
  fecha: string;
  hora: string;
  estado: "Pendiente" | "Confirmada" | "Cancelada";
};

export default function GestionCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [nuevoPaciente, setNuevoPaciente] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // 🧩 Cargar citas al iniciar
  useEffect(() => {
    const guardadas = localStorage.getItem("citas");
    if (guardadas) setCitas(JSON.parse(guardadas));
    else {
      const ejemplo: Cita[] = [
        { id: 1, paciente: "María Gómez", fecha: "2025-10-22", hora: "10:00", estado: "Pendiente" },
        { id: 2, paciente: "Camilo Ruiz", fecha: "2025-10-22", hora: "15:00", estado: "Confirmada" },
      ];
      setCitas(ejemplo);
      localStorage.setItem("citas", JSON.stringify(ejemplo));
    }
  }, []);

  // 💾 Guardar al cambiar
  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas]);

  // 🔔 Mostrar notificación
  const mostrarToast = (mensaje: string) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 2500);
  };

  const citasFiltradas = citas.filter((cita) => {
    const coincideNombre = cita.paciente.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtro === "Todos" || cita.estado === filtro;
    return coincideNombre && coincideEstado;
  });

  const actualizarEstado = (id: number, estado: Cita["estado"]) => {
    setCitas((prev) => prev.map((c) => (c.id === id ? { ...c, estado } : c)));
    mostrarToast(
      estado === "Confirmada" ? "✅ Cita confirmada" : "❌ Cita cancelada"
    );
  };

  const eliminarCita = (id: number) => {
    setCitas((prev) => prev.filter((c) => c.id !== id));
    mostrarToast("🗑️ Cita eliminada");
  };

  const agregarCita = () => {
    if (!nuevoPaciente || !nuevaFecha || !nuevaHora)
      return mostrarToast("⚠️ Completa todos los campos");
    const nueva: Cita = {
      id: Date.now(),
      paciente: nuevoPaciente,
      fecha: nuevaFecha,
      hora: nuevaHora,
      estado: "Pendiente",
    };
    setCitas((prev) => [...prev, nueva]);
    mostrarToast("✅ Cita agregada");
    setNuevoPaciente("");
    setNuevaFecha("");
    setNuevaHora("");
  };

  return (
    <div>
      <h2 style={{ color: "#4E3B2B" }}>Gestión de Citas</h2>
      <p className="text-muted">Busca, filtra, agrega o actualiza citas.</p>

      {/* 🔍 Filtros */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Buscar paciente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ maxWidth: "250px" }}
        />
        <select
          className="form-select shadow-sm"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      {/* ➕ Nueva cita */}
      <div className="card border-0 shadow-sm p-3 mb-4" style={{ background: "#FFFDF9" }}>
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Paciente"
              value={nuevoPaciente}
              onChange={(e) => setNuevoPaciente(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              className="form-control"
              value={nuevaHora}
              onChange={(e) => setNuevaHora(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" onClick={agregarCita}>
              ➕ Agregar cita
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Tabla */}
      <table className="table table-bordered shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th style={{ width: "220px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citasFiltradas.map((c) => (
            <tr key={c.id}>
              <td>{c.paciente}</td>
              <td>{c.fecha}</td>
              <td>{c.hora}</td>
              <td>
                <span
                  className={`badge ${
                    c.estado === "Confirmada"
                      ? "bg-success"
                      : c.estado === "Cancelada"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                >
                  {c.estado}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => actualizarEstado(c.id, "Confirmada")}
                >
                  Confirmar
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => actualizarEstado(c.id, "Cancelada")}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => eliminarCita(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {citasFiltradas.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted py-3">
                No se encontraron citas.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🌟 Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "30px",
            right: "30px",
            background: "#4E3B2B",
            color: "white",
            padding: "12px 18px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            animation: "fadein 0.4s, fadeout 0.4s 2.1s",
          }}
        >
          {toast}
        </div>
      )}

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeout {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
