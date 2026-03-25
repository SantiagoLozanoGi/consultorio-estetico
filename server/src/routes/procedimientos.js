const express     = require("express");
const router      = express.Router();
const { pool }    = require("../lib/db");
const verifyToken = require("../middlewares/verifyToken");
const requireRole = require("../middlewares/requireRole");

// GET /procedimientos — público
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nombre, descripcion, precio, imagen,
              categoria, duracion_min, destacado
       FROM procedimientos
       ORDER BY categoria ASC, nombre ASC`
    );
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error("Error GET /procedimientos:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener procedimientos" });
  }
});

// GET /procedimientos/:id — público
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, nombre, descripcion, precio, imagen,
              categoria, duracion_min, destacado
       FROM procedimientos WHERE id = $1 LIMIT 1`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ ok: false, error: "No encontrado" });
    return res.json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error("Error GET /procedimientos/:id:", err);
    return res.status(500).json({ ok: false, error: "Error al obtener procedimiento" });
  }
});

// POST /procedimientos — solo admin
router.post(
  "/",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    try {
      const { nombre, descripcion, precio, imagen, categoria, duracion_min, destacado } = req.body;

      if (!nombre?.trim() || !descripcion?.trim()) {
        return res.status(400).json({ ok: false, error: "Nombre y descripción son obligatorios" });
      }

      const { rows } = await pool.query(
        `INSERT INTO procedimientos (nombre, descripcion, precio, imagen, categoria, duracion_min, destacado)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [nombre, descripcion, precio ?? "0", imagen ?? "", categoria ?? "Facial", duracion_min ?? null, destacado ?? false]
      );

      return res.status(201).json({ ok: true, data: rows[0] });
    } catch (err) {
      console.error("Error POST /procedimientos:", err);
      return res.status(500).json({ ok: false, error: "Error al crear procedimiento" });
    }
  }
);

// PUT /procedimientos/:id — solo admin
router.put(
  "/:id",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    try {
      const { nombre, descripcion, precio, imagen, categoria, duracion_min, destacado } = req.body;

      const { rows } = await pool.query(
        `UPDATE procedimientos
         SET nombre=$1, descripcion=$2, precio=$3, imagen=$4,
             categoria=$5, duracion_min=$6, destacado=$7,
             actualizado_en=NOW()
         WHERE id=$8
         RETURNING *`,
        [nombre, descripcion, precio, imagen, categoria, duracion_min ?? null, destacado ?? false, req.params.id]
      );

      if (!rows.length) return res.status(404).json({ ok: false, error: "No encontrado" });
      return res.json({ ok: true, data: rows[0] });
    } catch (err) {
      console.error("Error PUT /procedimientos/:id:", err);
      return res.status(500).json({ ok: false, error: "Error al actualizar procedimiento" });
    }
  }
);

// DELETE /procedimientos/:id — solo admin
router.delete(
  "/:id",
  verifyToken,
  requireRole(["admin", "developer"]),
  async (req, res) => {
    try {
      await pool.query("DELETE FROM procedimientos WHERE id = $1", [req.params.id]);
      return res.json({ ok: true });
    } catch (err) {
      console.error("Error DELETE /procedimientos/:id:", err);
      return res.status(500).json({ ok: false, error: "Error al eliminar procedimiento" });
    }
  }
);

module.exports = router;