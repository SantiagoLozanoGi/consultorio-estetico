"use client";

export default function GestionProcedimientos() {
  const procedimientos = [
    "Relleno facial",
    "Toxina botulínica",
    "Hilos tensores",
    "Bioestimulación facial",
  ];

  return (
    <div>
      <h2 style={{ color: "#4E3B2B" }}>Gestión de Procedimientos</h2>
      <p className="text-muted">Lista de procedimientos activos y configuraciones.</p>
      <ul className="list-group shadow-sm mt-3">
        {procedimientos.map((p, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#FFFDF9", color: "#4E3B2B" }}
          >
            {p}
            <button className="btn btn-sm btn-outline-danger">Eliminar</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-success mt-4">➕ Agregar nuevo procedimiento</button>
    </div>
  );
}
