"use client";

export default function GestionUsuarios() {
  const usuarios = [
    { nombre: "medinapipe123", correo: "medinapipe123@gmail.com", rol: "Admin" },
    { nombre: "Juliet Medina", correo: "juliet@example.com", rol: "Usuario" },
    { nombre: "Camila Rojas", correo: "camila@gmail.com", rol: "Usuario" },
  ];

  return (
    <div>
      <h2 style={{ color: "#4E3B2B" }}>Gestión de Usuarios</h2>
      <p className="text-muted">Consulta y administra los usuarios registrados.</p>

      <table className="table table-striped mt-3 shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u, i) => (
            <tr key={i}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Editar</button>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
