const express     = require("express");
const router      = express.Router();
const { pool }    = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

/**
 * GET /usuarios/me
 * Devuelve el perfil completo del usuario autenticado.
 */
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nombres, apellidos, rol, photo, telefono,
              edad, genero, antecedentes, antecedentes_descripcion,
              alergias, alergias_descripcion,
              medicamentos, medicamentos_descripcion,
              creado_en
       FROM usuarios WHERE id = $1 LIMIT 1`,
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
    }

    return res.json({ ok: true, user: { ...rows[0], email: req.user.email } });
  } catch (err) {
    console.error("Error GET /usuarios/me:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener perfil" });
  }
});

/**
 * PUT /usuarios/me
 * Actualiza el perfil del usuario autenticado.
 */
router.put("/me", verifyToken, async (req, res) => {
  try {
    const campos  = [];
    const valores = [];

    const editables = [
      "nombres", "apellidos", "telefono", "edad", "genero", "photo",
      "antecedentes", "antecedentes_descripcion",
      "alergias", "alergias_descripcion",
      "medicamentos", "medicamentos_descripcion",
    ];

    for (const campo of editables) {
      if (req.body[campo] !== undefined) {
        campos.push(`${campo} = $${valores.length + 1}`);
        valores.push(req.body[campo]);
      }
    }

    if (!campos.length) {
      return res.status(400).json({ ok: false, error: "No hay campos para actualizar" });
    }

    // actualizado_en automático
    campos.push(`actualizado_en = NOW()`);
    valores.push(req.user.id);

    const { rows } = await pool.query(
      `UPDATE usuarios SET ${campos.join(", ")}
       WHERE id = $${valores.length}
       RETURNING id, nombres, apellidos, rol, photo, telefono, edad, genero`,
      valores
    );

    return res.json({ ok: true, user: { ...rows[0], email: req.user.email } });
  } catch (err) {
    console.error("Error PUT /usuarios/me:", err);
    return res.status(500).json({ ok: false, error: "Error al actualizar perfil" });
  }
});

/**
 * GET /usuarios — Solo admin
 * Lista todos los pacientes/usuarios.
 */
router.get(
  "/",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT id, nombres, apellidos, rol, photo, telefono, creado_en
         FROM usuarios ORDER BY creado_en DESC`
      );
      return res.json({ ok: true, usuarios: rows });
    } catch (err) {
      console.error("Error GET /usuarios:", err);
      return res.status(500).json({ ok: false, error: "Error al obtener usuarios" });
    }
  }
);

module.exports = router;