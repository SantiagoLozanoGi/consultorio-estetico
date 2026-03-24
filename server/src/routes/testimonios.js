const { pool } = require("../lib/db");

async function getTestimonios() {
  const { rows } = await pool.query(
    `SELECT id, nombre, texto, video, thumb, activo, destacado, "creadoEn"
     FROM testimonios
     WHERE activo = true
     ORDER BY destacado DESC, "creadoEn" DESC`
  );
  return rows;
}

async function createTestimonio({ nombre, texto, video, thumb, activo = true, destacado = false }) {
  const { rows } = await pool.query(
    `INSERT INTO testimonios (nombre, texto, video, thumb, activo, destacado, "creadoEn")
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     RETURNING id, nombre, texto, video, thumb, activo, destacado, "creadoEn"`,
    [nombre, texto, video, thumb, activo, destacado]
  );
  return rows[0];
}

async function updateTestimonio(id, data) {
  const campos = [];
  const valores = [];

  if (data.nombre    != null) { campos.push(`nombre    = $${valores.length + 1}`); valores.push(data.nombre); }
  if (data.texto     != null) { campos.push(`texto     = $${valores.length + 1}`); valores.push(data.texto); }
  if (data.video     != null) { campos.push(`video     = $${valores.length + 1}`); valores.push(data.video); }
  if (data.thumb     != null) { campos.push(`thumb     = $${valores.length + 1}`); valores.push(data.thumb); }
  if (data.activo    != null) { campos.push(`activo    = $${valores.length + 1}`); valores.push(data.activo); }
  if (data.destacado != null) { campos.push(`destacado = $${valores.length + 1}`); valores.push(data.destacado); }

  if (!campos.length) return null;

  valores.push(id);
  const { rows } = await pool.query(
    `UPDATE testimonios SET ${campos.join(", ")} WHERE id = $${valores.length}
     RETURNING id, nombre, texto, video, thumb, activo, destacado, "creadoEn"`,
    valores
  );
  return rows[0];
}

async function deleteTestimonio(id) {
  await pool.query("DELETE FROM testimonios WHERE id = $1", [id]);
  return true;
}

module.exports = { getTestimonios, createTestimonio, updateTestimonio, deleteTestimonio };